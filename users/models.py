from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from database import Base
from associations import user_chat


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=True)
    username = Column(String(24), nullable=False, unique=True)
    password = Column(String(60), nullable=False)
    profile_photo = Column(String(30), nullable=True)

    # атрибуты связи
    chats = relationship(
        'Chat', secondary=user_chat, back_populates='users'
    )

    def __str__(self):
        return f'User(id={self.id},username={self.username})'

    def __repr__(self):
        return str(self)
