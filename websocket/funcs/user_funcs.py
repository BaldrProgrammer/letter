import os
from sqlalchemy import update
from sqlalchemy.exc import SQLAlchemyError
from database import session_maker

from users.models import User


async def set_profile_photo(user_id: int, profile_photo: bytes):
    if not (str(user_id) in os.listdir('storage')):
        os.mkdir(f'storage/{user_id}')

    newpath = f'storage/{user_id}/profile_photo.jpg'
    with open(newpath, 'wb') as file:
        file.write(profile_photo)

    stmt = update(User).where(User.id == user_id).values(profile_photo=newpath)
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e

    return {'ok': True, 'newpath': newpath}
