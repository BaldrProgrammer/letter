from fastapi import APIRouter, WebSocket
import logging

from urllib3.util import connection

router = APIRouter(prefix='/ws', tags=['ПРОБНИК ДЛЯ ВЕБСОКЕТОВ'])
logger = logging.Logger(__name__)


connections = {}


@router.websocket('/')
async def ws(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        logger.info(data)
        await websocket.send_text(data)
