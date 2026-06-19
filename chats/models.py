from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from typing import List
from database import Base
from associations import user_chat


class Chat(Base):
    __tablename__ = 'chats'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(64), nullable=False)

    # атрибуты связи
    users = relationship(
        'User', secondary=user_chat, back_populates='chats'
    )
    messages = relationship('Message', back_populates='chat')

    def __str__(self):
        return f'Chat(id={self.id},title={self.title})'

    def __repr__(self):
        return str(self)
