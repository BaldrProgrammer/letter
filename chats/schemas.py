from typing import List

from pydantic import BaseModel, Field


class SChatAdd(BaseModel):
    users: List[int]


class SChatGet(BaseModel):
    id: int
    title: str
    profile_photo: str | None
