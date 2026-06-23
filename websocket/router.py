from fastapi import APIRouter, WebSocket

from jose import JWTError
from users.auth import jwt_decode

from chats.schemas import SChatAdd
from messages.schemas import SMessageAdd
from websocket.utils import create_chat, send_message

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

            case 'create_chat': # {"type": "create_chat", "title": "наливайкины", "users": [4, 10]}
                await create_chat(SChatAdd(title=payload['title'], users=payload['users']))

            case 'send_message': # {"type": "send_message", "text": "привет!", "chat_id": 5}
                await send_message(ws, SMessageAdd(text=payload['text'], chat_id=payload['chat_id']))
