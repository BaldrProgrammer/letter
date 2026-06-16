from fastapi import APIRouter, Response, status, HTTPException

from sqlalchemy import select, insert
from sqlalchemy.exc import SQLAlchemyError

from settings import settings
from database import session_maker
from cache.redis_object import RedisCacheBackend
from users.models import User
from users.schemas import SEmail, SUserAuth, SUserReg, SUserGet
from users.auth import jwt_encode, send_code

router = APIRouter(prefix='/auth', tags=['/auth'])
redis = RedisCacheBackend(settings.REDIS_URL, 180)


@router.post('/send_code')
async def send_code_endpoint(send_to: SEmail):
    code = send_code(send_to.email)
    await redis.set(f'{send_to.email}:code', code)
    return {'ok': True}


@router.post('/check_code')
async def user_log(response: Response, auth_data: SUserAuth):
    stmt = select(User).where(User.email == auth_data.email)
    async with session_maker() as session:
        code_from_redis = await redis.get(f'{auth_data.email}:code')
        if code_from_redis:
            if auth_data.code == int(code_from_redis):
                if not auth_data.is_login:
                    return {'ok': True}

                result = await session.execute(stmt)
                result = result.scalars().one_or_none()
                if result:
                    result_user = SUserGet.model_validate(result)
                    response.set_cookie('access_token', jwt_encode({'user_id': result_user.id}))
                    return {'ok': True, 'access_token': jwt_encode({'user_id': result_user.id})}

                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='die Email nicht gefunden')
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='der Code passiert nicht')
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='der Code ist abgelaufen oder nicht gesendet')


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
