from pydantic import BaseModel, Field


class SChatAdd(BaseModel):
    title: str = Field(min_length=1, max_length=128)


class SChatGet(BaseModel):
    id: int
    title: str
