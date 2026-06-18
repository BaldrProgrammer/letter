from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from database import Base
from associations import user_chat


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=True)
    email = Column(String(80), nullable=False, unique=True)
    username = Column(String(24), nullable=False, unique=True)
    password = Column(String(60), nullable=True)
    profile_photo = Column(String(30), nullable=True)

    # атрибуты связи
    setting = relationship(
        'Setting',
        back_populates='user',
        uselist=False
    )

    chats = relationship(
        'Chat',
        secondary=user_chat,
        back_populates='users'
    )

    def __str__(self):
        return f'User(id={self.id},username={self.username})'

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'password': self.password,
            'profile_photo': self.profile_photo
        }


class Setting(Base):
    __tablename__ = 'settings'

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)
    user = relationship('User', back_populates='setting')

    auth_with_password = Column(Boolean, default=False)
    language = Column(String(2), default='de')

    def __str__(self):
        return f'Setting(id={self.id},user_id={self.user_id})'

    def __repr__(self):
        return str(self)
