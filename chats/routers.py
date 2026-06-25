from fastapi import APIRouter, HTTPException, status

from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Optional

from database import session_maker
from chats.models import Chat
from chats.schemas import SChatGet
from users.schemas import SUserGet
from messages.schemas import SMessageGet

router = APIRouter(prefix='/chats', tags=['/chats'])


@router.get('/all')
async def get_all() -> List[SChatGet]:
    stmt = select(Chat)
    async with session_maker() as session:
        result = await session.execute(stmt)
        return result.scalars().all()


@router.get('/users')
async def get_chat_users(chat_id: int) -> List[SUserGet]:
    stmt = select(Chat).where(Chat.id == chat_id).options(selectinload(Chat.users))
    async with session_maker() as session:
        result = await session.execute(stmt)
        chat = result.scalars().one_or_none()
        if not chat:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='der Chat ist nicht gefunden')

        return chat.users


@router.get('/messages')
async def get_chat_messages(chat_id: int, limit: Optional[int] = None) -> List[SMessageGet]:
    stmt = select(Chat).where(Chat.id == chat_id).options(selectinload(Chat.messages))
    async with session_maker() as session:
        result = await session.execute(stmt)
        chat = result.scalars().one_or_none()
        if not chat:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='der Chat ist nicht gefunden')

        if not limit:
            return chat.messages
        return chat.messages[len(chat.messages)-limit:]
