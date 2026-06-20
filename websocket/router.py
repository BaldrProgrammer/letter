from fastapi import APIRouter, WebSocket

from jose import JWTError
from users.auth import jwt_decode

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
        ... # тут код позже будет
