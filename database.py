from settings import get_db_url

from sqlalchemy import func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs

from typing import Annotated
import datetime

engine = create_async_engine(get_db_url())
session_maker = async_sessionmaker(engine, expire_on_commit=True)

created_at = Annotated[datetime, mapped_column(server_default=func.now())]
updated_at = Annotated[datetime, mapped_column(server_default=func.now(), onupdate=datetime.now)]


class Base(AsyncAttrs, DeclarativeBase):
    created_at: created_at
    updated_at: updated_at
