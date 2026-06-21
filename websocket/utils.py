from fastapi import WebSocket
from websocket.schemas import SMessageAdd


async def send_message(ws: WebSocket, message_data: SMessageAdd):
    await ws.send_json(message_data.model_dump())
