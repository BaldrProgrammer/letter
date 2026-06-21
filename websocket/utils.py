from fastapi import WebSocket

from chats.schemas import SChatAdd
from messages.schemas import SMessageAdd


async def add_chat(add_data: SChatAdd) -> dict:
    stmt = insert(Chat).values(title=add_data.title)
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
            return {'ok': True}
        except SQLAlchemyError as e:
            await session.rollback()
            raise e

async def send_message(ws: WebSocket, message_data: SMessageAdd):
    await ws.send_json(message_data.model_dump())
