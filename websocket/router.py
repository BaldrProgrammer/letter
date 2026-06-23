from fastapi import APIRouter, WebSocket

from jose import JWTError
from users.auth import jwt_decode

from chats.schemas import SChatAdd
from messages.schemas import SMessageAdd
from websocket.funcs.chat_funcs import create_chat, delete_chat
from websocket.funcs.message_funcs import create_message

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

            case 'create_chat': # {"type": "create_chat", "title": "Chat-Name", "users": [4, 10]}
                await create_chat(connections, SChatAdd(title=payload['title'], users=payload['users']))

            case 'delete_chat': # {"type": "delete_chat", "chat_id": 22}
                await delete_chat(ws, connections, payload['chat_id'])

            case 'create_message': # {"type": "send_message", "text": "halo!", "chat_id": 5}
                await create_message(ws, SMessageAdd(text=payload['text'], chat_id=payload['chat_id']))
