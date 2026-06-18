from fastapi import APIRouter

from sqlalchemy import select
from typing import List

from database import session_maker
from chats.models import Chat
from chats.schemas import SChatGet

router = APIRouter(prefix='/chats', tags=['/chats'])


@router.get('/all')
async def get_all() -> List[SChatGet]:
    stmt = select(Chat)
    async with session_maker() as session:
        result = await session.execute(stmt)
        return result.scalars().all()
