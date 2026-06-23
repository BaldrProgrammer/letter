from fastapi import APIRouter, HTTPException, status

from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List

from database import session_maker
from chats.models import Chat
from chats.schemas import SChatAdd, SChatGet
from users.schemas import SUserGet

router = APIRouter(prefix='/chats', tags=['/chats'])


@router.get('/all')
async def get_all() -> List[SChatGet]:
    stmt = select(Chat)
    async with session_maker() as session:
        result = await session.execute(stmt)
        return result.scalars().all()
