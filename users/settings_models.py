from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from database import Base


class Setting(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    auth_with_password = Column(Boolean, default=False)
    language = Column(String(2), default='de')
