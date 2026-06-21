from typing import List

from pydantic import BaseModel, Field


class SChatAdd(BaseModel):
    title: str = Field(min_length=1, max_length=64)
    users: List[int]


class SChatGet(BaseModel):
    id: int
    title: str
