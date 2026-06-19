from sqlalchemy import Column, UUID, Integer, String, Boolean, ForeignKey, select
from sqlalchemy.orm import relationship, joinedload
import uuid

from database import Base, session_maker
import asyncio

from users.models import User
from chats.models import Chat


class Message(Base):
    __tablename__ = 'messages'

    id = Column(UUID, primary_key=True, default=lambda: uuid.uuid4())
    text = Column(String(8192), nullable=False)
    is_edited = Column(Boolean, default=False)
    is_forwarded = Column(Boolean, default=False)
    sender_id = Column(Integer, ForeignKey('users.id'))

    sender = relationship('User')
