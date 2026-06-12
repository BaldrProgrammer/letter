from pydantic import BaseModel, Field


class SUserAuth(BaseModel):
    username: str = Field(min_length=1, max_length=24)
    password: str = Field(min_length=1, max_length=32)


class SUserReg(BaseModel):
    first_name: str = Field(min_length=1, max_length=50)
    last_name: str | None = Field(default=None, min_length=1, max_length=50)
    username: str = Field(min_length=1, max_length=24)
    password: str = Field(min_length=1, max_length=32)


class SUserGet(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    password: str
    profile_photo: str
