from fastapi import WebSocket

from database import session_maker

from users.models import User
from chats.models import Chat
from messages.models import Message
from messages.schemas import SMessageAdd


async def create_message(ws: WebSocket, message_data: SMessageAdd):
    async with session_maker() as session:
        user = await session.get(User, message_data.sender_id)
        chat = await session.get(Chat, message_data.chat_id)

        new_message = Message(
            text=message_data.text,
            sender_id=message_data.sender_id,
            chat_id=message_data.chat_id,

            user=user,
            chat=chat
        )
