from fastapi import APIRouter, Request, HTTPException, status

from sqlalchemy import select
from typing import List

from database import session_maker
from users.auth import jwt_decode
from users.models import User
from users.schemas import SUserGet, SUserFilters

router = APIRouter(prefix='/users', tags=['/users'])


@router.get('/all')
async def get_all_users() -> List[SUserGet]:
    stmt = select(User)
    async with session_maker() as session:
        result = await session.execute(stmt)
        return result.scalars().all()


@router.post('/by_filter')
async def get_all_users(filters: SUserFilters) -> List[SUserGet]:
    stmt = select(User).filter_by(**filters.model_dump(exclude_none=True))
    async with session_maker() as session:
        result = await session.execute(stmt)
        return result.scalars().all()


@router.get('/current')
async def get_current_user(request: Request) -> SUserGet:
    token = request.cookies.get('access_token')
    if token:
        user_id = jwt_decode(str(token))['user_id']
        stmt = select(User).where(User.id == user_id)
        async with session_maker() as session:
            result = await session.execute(stmt)
            result = result.scalars().one_or_none()
            if result:
                return result
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='benutzer ist nicht gefunden')
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='auth cookies fehlen')
