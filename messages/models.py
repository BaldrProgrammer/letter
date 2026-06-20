from sqlalchemy import Column, UUID, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
import uuid

from database import Base


class Message(Base):
    __tablename__ = 'messages'

    id = Column(UUID, primary_key=True, default=lambda: uuid.uuid4())
    text = Column(String(8192), nullable=False)
    is_edited = Column(Boolean, default=False)
    is_forwarded = Column(Boolean, default=False)
    sender_id = Column(Integer, ForeignKey('users.id'))
    chat_id = Column(Integer, ForeignKey('chats.id'))

    chat = relationship('Chat', back_populates='messages')
    user = relationship('User')
