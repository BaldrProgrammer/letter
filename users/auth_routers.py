from fastapi import APIRouter, Response, status, HTTPException

from sqlalchemy import select, insert
from sqlalchemy.exc import SQLAlchemyError

from settings import settings
from database import session_maker
from cache.redis_object import RedisCacheBackend
from users.models import User
from users.schemas import SUserAuth, SUserReg, SUserGet
from users.auth import verify_password, jwt_encode, send_code

router = APIRouter(prefix='/auth', tags=['/auth'])
redis = RedisCacheBackend(settings.REDIS_URL, 60)


@router.post('/send_code')
async def send_code_endpoint(send_to: str):
    code = send_code(send_to)
    await redis.set(f'{send_to}:code', code)
    return {'ok': True}


@router.post('/check_code')
async def user_log(response: Response, email: str, code: int, is_login: bool):
    stmt = select(User).where(User.email == email)
    async with session_maker() as session:
        code_from_redis = await redis.get(f'{email}:code')
        if code_from_redis:
            if code == int(code_from_redis):
                if not is_login:
                    return {'ok': True}

                result = await session.execute(stmt)
                result = result.scalars().one_or_none()
                if result:
                    result_user = SUserGet(**result.to_dict())
                    response.set_cookie('access_token', jwt_encode({'user_id': result_user.id}))
                    return {'ok': True, 'access_token': jwt_encode({'user_id': result_user.id})}

                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='email not found')
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='code does not pass')
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='code expired or not sent')


@router.post('/reg')
async def user_reg(user_data: SUserReg) -> dict:
    stmt = insert(User).values(first_name=user_data.first_name,
                               last_name=user_data.last_name,
                               email=user_data.email,
                               username=user_data.username,
                               password=user_data.password)
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e

    return {'ok': True}
