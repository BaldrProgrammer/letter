from pydantic import BaseModel, Field


class SEmail(BaseModel):
    email: str = Field(pattern='^[a-zA-Z0-9._%+-]+@gmail\\.com$')


class SUserAuth(BaseModel):
    email: str = Field(pattern='^[a-zA-Z0-9._%+-]+@gmail\\.com$')
    code: int = Field(ge=100_000, le=999_999)
    is_login: bool


class SUserReg(BaseModel):
    first_name: str = Field(min_length=1, max_length=50)
    last_name: str | None = Field(default=None, min_length=1, max_length=50)
    email: str = Field(pattern='^[a-zA-Z0-9._%+-]+@gmail\\.com$')
    username: str = Field(min_length=1, max_length=24)
    password: str | None = Field(min_length=1, max_length=32)


class SUserFilters(BaseModel):
    id: int | None = Field(default=None)
    first_name: str | None = Field(default=None, min_length=1, max_length=50)
    last_name: str | None = Field(default=None, min_length=1, max_length=50)
    email: str | None = Field(default=None, pattern='^[a-zA-Z0-9._%+-]+@gmail\\.com$')
    username: str | None = Field(default=None, min_length=1, max_length=24)


class SUserGet(BaseModel):
    id: int
    first_name: str
    last_name: str | None
    email: str
    username: str
    password: str | None
    profile_photo: str | None

    class Config:
        from_attributes = True
