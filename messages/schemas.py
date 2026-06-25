from pydantic import BaseModel, Field
from uuid import UUID


class SMessageAdd(BaseModel):
    text: str = Field(min_length=1, max_length=8192)
    sender_id: int = Field(ge=1)
    chat_id: int = Field(ge=1)


class SMessageGet(BaseModel):
    id: UUID = Field(...)
    text: str = Field(min_length=1, max_length=8192)
    is_edited: bool = Field(...)
    is_forwarded: bool = Field(...)
    sender_id: int = Field(ge=1)
    chat_id: int = Field(ge=1)
