from pydantic import BaseModel, Field


class SMessageAdd(BaseModel):
    text: str = Field(min_length=1, max_length=8192)
    sender_id: int = Field(ge=1)
    chat_id: int = Field(ge=1)
