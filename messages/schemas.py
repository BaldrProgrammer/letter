from pydantic import BaseModel, Field


class SMessageAdd(BaseModel):
    text: str = Field(min_length=1, max_length=8192)
    sender_id: int = Field(ge=1)
    chat_id: int = Field(ge=1)


class SMessageGet(BaseModel):
    id: int = Field(ge=1)
    text: str = Field(min_length=1, max_length=8192)
    is_edited: bool = Field(...)
    is_forwarded: bool = Field(...)
    sender_id: int = Field(ge=1)
    chat_id: int = Field(ge=1)
