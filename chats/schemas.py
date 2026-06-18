from pydantic import BaseModel, Field


class SChatAdd(BaseModel):
    title: str = Field(min_length=1, max_length=128)
