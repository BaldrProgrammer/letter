from fastapi import APIRouter

from sqlalchemy import insert
from database import session_maker

from users.models import User
from users.schemas import SUserReg, SUserGet

router = APIRouter(prefix='/auth', tags=['/auth'])


@router.post('/reg')
async def user_reg(user_data: SUserReg):
    stmt = insert(User).values(first_name=user_data.first_name,
                               last_name=user_data.last_name,
                               username=user_data.username,
                               password=user_data.password)
    async with session_maker() as session:
        await session.execute(stmt)
        await session.commit()
