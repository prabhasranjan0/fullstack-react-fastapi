from fastapi import APIRouter, HTTPException
from typing import List
from ..schemas.todo import Todo, TodoCreate, TodoUpdate

router = APIRouter()

# In-memory store
todos: List[Todo] = []
current_id = 1


@router.get("/todos", response_model=List[Todo])
async def get_todos():
    return todos


@router.post("/todos", response_model=Todo)
async def create_todo(todo: TodoCreate):
    global current_id
    new_todo = Todo(id=current_id, title=todo.title, completed=todo.completed)
    current_id += 1
    todos.append(new_todo)
    return new_todo


@router.get("/todos/{todo_id}", response_model=Todo)
async def get_todo(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@router.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo_update: TodoUpdate):
    for todo in todos:
        if todo.id == todo_id:
            if todo_update.title is not None:
                todo.title = todo_update.title
            if todo_update.completed is not None:
                todo.completed = todo_update.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@router.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(i)
            return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")
