from pydantic import BaseModel, Field


class SMessageAdd(BaseModel):
    text: str = Field(min_length=1, max_length=8192)
    chat_id: int = Field(ge=1)
