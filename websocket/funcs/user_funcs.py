from sqlalchemy import update
from sqlalchemy.exc import SQLAlchemyError
from database import session_maker

from datetime import datetime, timezone

from users.models import User


async def enter_online(user_id):
    stmt = update(User).where(User.id == user_id).values(online = True, last_online = datetime.now(timezone.utc))
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e


async def exit_online(user_id):
    stmt = update(User).where(User.id == user_id).values(online = False, last_online = datetime.now(timezone.utc))
    async with session_maker() as session:
        await session.execute(stmt)
        try:
            await session.commit()
        except SQLAlchemyError as e:
            await session.rollback()
            raise e
