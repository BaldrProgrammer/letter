from pydantic import BaseModel, Field


class SUserAuth(BaseModel):
    username: str = Field(min_length=1, max_length=24)
    password: str = Field(min_length=1, max_length=32)
