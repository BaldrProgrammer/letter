from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from database import Base
from associations import user_chat


class Chat(Base):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(64), nullable=False)
    users = relationship(
        'User', secondary=user_chat, back_populates='chats'
    )
