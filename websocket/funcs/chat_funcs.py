from fastapi import WebSocket

from sqlalchemy import select, delete
from sqlalchemy.exc import SQLAlchemyError
from database import session_maker

from users.models import User
from chats.models import Chat
from chats.schemas import SChatAdd


async def create_chat(connections: dict, add_data: SChatAdd):
    async with session_maker() as session:
        users = (
            await session.execute(
                select(User).where(User.id.in_(add_data.users))
            )
        ).scalars().all()
        new_chat = Chat(title=add_data.title, users=users)
        session.add(new_chat)

        for user in users:
            user_socket = connections.get(user.id)
            if user_socket:
                await user_socket.send_json(
                    {
                        'type': 'create_chat',
                        'chat_id': new_chat.id,
                        'title': new_chat.title,
                    }
                )

        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e
