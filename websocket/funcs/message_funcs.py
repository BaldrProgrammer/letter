from fastapi import WebSocket

from database import session_maker
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import SQLAlchemyError

from users.models import User
from chats.models import Chat
from messages.models import Message
from messages.schemas import SMessageAdd


async def create_message(connections: dict, message_data: SMessageAdd):
    async with session_maker() as session:
        stmt = select(Chat).where(Chat.id == message_data.chat_id).options(selectinload(Chat.users))
        result = await session.execute(stmt)
        chat = result.scalars().one_or_none()
        user = await session.get(User, message_data.sender_id)

        new_message = Message(
            text=message_data.text,
            sender_id=message_data.sender_id,
            chat_id=message_data.chat_id,

            user=user,
            chat=chat
        )
        session.add(new_message)

        for user_in_chat in chat.users:
            print(user_in_chat)
            user_socket = connections.get(user_in_chat.id)
            if user_socket:
                await user_socket.send_json(
                    {
                        'type': 'create_message',
                        'text': new_message.text,
                        'chat_id': new_message.chat_id,
                        'sender_id': new_message.sender_id,
                        'date': str(new_message.created_at)
                    }
                )

        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e
