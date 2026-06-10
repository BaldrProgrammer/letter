from settings import get_db_url

from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs

engine = create_async_engine(get_db_url())
session_maker = async_sessionmaker(engine, expire_on_commit=True)


class Base(AsyncAttrs, DeclarativeBase):
    pass
