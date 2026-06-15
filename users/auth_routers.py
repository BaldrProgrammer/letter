from fastapi import APIRouter, Response

from sqlalchemy import select, insert
from sqlalchemy.exc import SQLAlchemyError

from database import session_maker
from users.models import User
from users.schemas import SUserAuth, SUserReg, SUserGet
from users.auth import get_hashed_password

router = APIRouter(prefix='/auth', tags=['/auth'])


@router.post('/log')
async def user_reg(response: Response, auth_data: SUserAuth): # -> SUserGet
    stmt = select(User).where(User.username == auth_data.username)
    async with session_maker() as session:
        result = await session.execute(stmt)
        result = result.scalars().one_or_none().to_dict()
        return SUserGet(**result)


@router.post('/reg')
async def user_reg(user_data: SUserReg) -> dict:
    hashed_password = get_hashed_password(user_data.password)
    stmt = insert(User).values(first_name=user_data.first_name,
                               last_name=user_data.last_name,
                               username=user_data.username,
                               password=hashed_password)
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e

    return {'ok': True}
