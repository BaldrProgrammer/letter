from settings import get_db_url

from sqlalchemy import DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncAttrs

from datetime import datetime, UTC

engine = create_async_engine(get_db_url())
session_maker = async_sessionmaker(engine, expire_on_commit=True)


class Base(AsyncAttrs, DeclarativeBase):
    created_at: Mapped[datetime] = mapped_column(DateTime(), default=lambda: datetime.now(UTC))
    updated_at: Mapped[datetime] = mapped_column(DateTime(), default=lambda: datetime.now(UTC), onupdate=lambda: datetime.now(UTC))
