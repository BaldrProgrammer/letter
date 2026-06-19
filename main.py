from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from users.routers import router as users_router
from users.auth_routers import router as auth_router
from chats.routers import router as chats_router
from messages.routers import router as messages_router
from models import User, Chat, Message

app = FastAPI()
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(chats_router)
app.include_router(messages_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*']
)
