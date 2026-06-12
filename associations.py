from sqlalchemy import Table, Column, Integer, ForeignKey

from database import Base

user_chat = Table(
    "user_chat",
    Base.metadata,
    Column("user_id", Integer(), ForeignKey('users.id')),
    Column("chat_id", Integer(), ForeignKey('chats.id'))
)
