from fastapi import APIRouter, WebSocket

from jose import JWTError
from users.auth import jwt_decode

from messages.schemas import SMessageAdd
from websocket.utils import send_message

router = APIRouter(prefix='/ws')

connections = {}


@router.websocket('/')
async def websocket(ws: WebSocket):
    access_token = ws.headers.get('access_token')
    if not access_token:
        raise ws.close(code=1008, reason='auth cookies fehlen')

    try:
        user_id = jwt_decode(access_token)['user_id']
    except JWTError:
        raise ws.close(code=1008, reason='der Token ist fehlerhaft')

    await ws.accept()
    connections[user_id] = ws
    while True:
        payload = await ws.receive_json()
        match payload['type']:
            case 'close':
                await ws.close()
                break

            case 'send_message':
                await send_message(ws, SMessageAdd(text=payload['text'], chat_id=payload['chat_id']))
