from fastapi import WebSocket

from messages.schemas import SMessageAdd


async def create_message(ws: WebSocket, message_data: SMessageAdd):
    await ws.send_json(message_data.model_dump())
