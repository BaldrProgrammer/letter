from fastapi import APIRouter, HTTPException, status

from sqlalchemy import select, insert, delete
from sqlalchemy.exc import SQLAlchemyError
from typing import List

from database import session_maker
from chats.models import Chat
from chats.schemas import SChatAdd, SChatGet
from starlette.exceptions import HTTPException

router = APIRouter(prefix='/chats', tags=['/chats'])


@router.get('/all')
async def get_all() -> List[SChatGet]:
    stmt = select(Chat)
    async with session_maker() as session:
        result = await session.execute(stmt)
        return result.scalars().all()


@router.post('/add')
async def add_chat(add_data: SChatAdd) -> dict:
    stmt = insert(Chat).values(title=add_data.title)
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
            return {'ok': True}
        except SQLAlchemyError as e:
            await session.rollback()
            raise e


@router.delete('/')
async def delete_chat(chat_id: int) -> dict:
    stmt = select(Chat).where(Chat.id == chat_id)
    async with session_maker() as session:
        result = await session.execute(stmt)
        result = result.scalars().one_or_none()
    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='chat nicht gefunden')

    stmt = delete(Chat).where(Chat.id == chat_id)
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
            return {'ok': True}
        except SQLAlchemyError as e:
            await session.rollback()
            raise e
