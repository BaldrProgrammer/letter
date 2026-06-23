from fastapi import APIRouter, HTTPException, status

from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List

from database import session_maker
from chats.models import Chat
from chats.schemas import SChatGet
from users.schemas import SUserGet

router = APIRouter(prefix='/chats', tags=['/chats'])


@router.get('/all')
async def get_all() -> List[SChatGet]:
    stmt = select(Chat)
    async with session_maker() as session:
        result = await session.execute(stmt)
        return result.scalars().all()


@router.get('/users')
async def get_chat_users(chat_id: int) -> List[SUserGet]:
    async with session_maker() as session:
        stmt = select(Chat).where(Chat.id == chat_id).options(selectinload(Chat.users))
        chat = await session.execute(stmt)
        chat = chat.scalars().one_or_none()
        if not chat:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='der Chat ist nicht gefunden')

        return chat.users
