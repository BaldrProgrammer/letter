from fastapi import APIRouter, Request, HTTPException, status, UploadFile
from fastapi.responses import FileResponse

from sqlalchemy import select, update
from sqlalchemy.orm import joinedload, selectinload
from sqlalchemy.exc import SQLAlchemyError
from typing import List, Optional
import os

from database import session_maker
from users.auth import jwt_decode
from users.models import User, Setting
from users.schemas import SUserGet, SSettingGet, SSettingPatch

from chats.schemas import SChatGet

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


@router.get('/get_settings')
async def get_chats(user_id: int) -> SSettingGet:
    stmt = select(User).where(User.id == user_id).options(joinedload(User.setting))
    async with session_maker() as session:
        result = await session.execute(stmt)
        result = result.scalars().one_or_none()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='benutzer ist nicht gefunden')

        return result.setting


@router.patch('/change_setting')
async def get_chats(user_id: int, new_data: SSettingPatch) -> dict:
    stmt = select(User).where(User.id == user_id).options(joinedload(User.setting))
    async with session_maker() as session:
        result = await session.execute(stmt)
        result = result.scalars().one_or_none()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='benutzer ist nicht gefunden')

        stmt = update(Setting).where(Setting.id == result.setting.id).values(**new_data.model_dump(exclude_none=True))
        await session.execute(stmt)
        try:
            await session.commit()
            return {'ok': True, 'new_setting': new_data.model_dump(exclude_none=True)}
        except SQLAlchemyError as e:
            await session.rollback()
            raise e


@router.get('/get_chats')
async def get_chats(user_id: int) -> List[SChatGet]:
    stmt = select(User).where(User.id == user_id).options(selectinload(User.chats))
    async with session_maker() as session:
        result = await session.execute(stmt)
        result = result.scalars().one_or_none()
        if not result:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='benutzer ist nicht gefunden')

    return result.chats


@router.get('/get_profile_photo')
async def get_profile_photo(user_id: int) -> FileResponse:
    if os.path.isfile(f'storage/{user_id}/profile_photo.jpg'):
        return FileResponse(path=f'storage/{user_id}/profile_photo.jpg', media_type='image/jpg')

    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='der Benutzer hat kein Profilbild')


@router.patch('/set_profile_photo')
async def set_profile_photo(user_id: int, profile_photo: UploadFile):
    if not (str(user_id) in os.listdir('storage')):
        os.mkdir(f'storage/{user_id}')

    newpath = f'storage/{user_id}/profile_photo.jpg'
    with open(newpath, 'wb') as file:
        file.write(await profile_photo.read())

    stmt = update(User).where(User.id == user_id).values(profile_photo=newpath)
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e

    return {'ok': True, 'newpath': newpath}


@router.delete('/delete_profile_photo')
async def set_profile_photo(user_id: int):
    if os.path.isfile(f'storage/{user_id}/profile_photo.jpg'):
        os.remove(f'storage/{user_id}/profile_photo.jpg')

        stmt = update(User).where(User.id == user_id).values(profile_photo=None)
        async with session_maker() as session:
            await session.execute(stmt)
            try:
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e

        return {'ok': True}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='der Benutzer hat kein Profilbild')
