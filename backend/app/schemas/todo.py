from pydantic import BaseModel
from typing import Optional


class TodoBase(BaseModel):
    title: str
    completed: bool = False


class TodoCreate(TodoBase):
    pass


class TodoUpdate(TodoBase):
    title: Optional[str] = None
    completed: Optional[bool] = None


class Todo(TodoBase):
    id: int

    class Config:
        from_attributes = True
