from fastapi import APIRouter, WebSocket

router = APIRouter(prefix='/ws')

connections = {}
