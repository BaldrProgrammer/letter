from fastapi import APIRouter, Request, HTTPException, status

from sqlalchemy import select
from typing import List, Optional

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


@router.get('/filter_by')
async def get_all_users(
        user_id: Optional[int] = None,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        email: Optional[str] = None,
        username: Optional[str] = None
    ) -> List[SUserGet]:

    stmt = select(User)
    if user_id:
        stmt = stmt.where(User.id == user_id)
    if first_name:
        stmt = stmt.where(User.first_name == first_name)
    if last_name:
        stmt = stmt.where(User.last_name == last_name)
    if email:
        stmt = stmt.where(User.email == email)
    if username:
        stmt = stmt.where(User.username == username)

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
