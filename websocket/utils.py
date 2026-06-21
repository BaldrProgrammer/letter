from fastapi import WebSocket

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from database import session_maker

from users.models import User
from chats.models import Chat
from chats.schemas import SChatAdd
from messages.schemas import SMessageAdd


async def create_chat(add_data: SChatAdd):
    async with session_maker() as session:
        users = (
            await session.execute(
                select(User).where(User.id.in_(add_data.users))
            )
        ).scalars().all()
        new_chat = Chat(title=add_data.title, users=users)
        session.add(new_chat)

        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e


async def send_message(ws: WebSocket, message_data: SMessageAdd):
    await ws.send_json(message_data.model_dump())
