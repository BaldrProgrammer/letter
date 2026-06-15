from fastapi import APIRouter, Response, status, HTTPException

from sqlalchemy import select, insert
from sqlalchemy.exc import SQLAlchemyError

from database import session_maker
from users.models import User
from users.schemas import SUserAuth, SUserReg, SUserGet
from users.auth import verify_password, jwt_encode, send_code

router = APIRouter(prefix='/auth', tags=['/auth'])


@router.post('/send_code')
async def send_code_endpoint(send_to: str):
    code = send_code(send_to)
    with open('sys/code.txt', 'w') as file:
        file.write(code)


@router.post('/log')
async def user_log(response: Response, auth_data: SUserAuth):
    stmt = select(User).where(User.username == auth_data.username)
    async with session_maker() as session:
        result = await session.execute(stmt)
        result = result.scalars().one_or_none()
        if result:
            result_user = SUserGet(**result.to_dict())
            if verify_password(auth_data.password, result_user.password):
                response.set_cookie('access_token', jwt_encode({'user_id': result_user.id}))

                return {'ok': True, 'access_token': jwt_encode({'user_id': result_user.id})}

        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='incorrect login or password')


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
