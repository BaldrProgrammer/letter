from sqlalchemy import Column, Integer, String

from database import Base


class Chat(Base):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(64), nullable=False)
