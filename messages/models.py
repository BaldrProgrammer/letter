from sqlalchemy import Column, Integer, String, Boolean
import uuid

from database import Base


class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True, default=lambda: uuid.uuid4())
    text = Column(String(8192), nullable=False)
    is_edited = Column(Boolean, default=False)
    is_forwarded = Column(Boolean, default=False)
