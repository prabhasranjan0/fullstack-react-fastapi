from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Todo model
class Todo(BaseModel):
    id: Optional[int] = None
    title: str
    completed: bool = False


# In-memory store
todos: List[Todo] = []
current_id = 1


@app.get("/todos", response_model=List[Todo])
async def get_todos():
    return todos


@app.post("/todos", response_model=Todo)
async def create_todo(todo: Todo):
    global current_id
    todo.id = current_id
    current_id += 1
    todos.append(todo)
    return todo


@app.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, updated_todo: Todo):
    for todo in todos:
        if todo.id == todo_id:
            todo.title = updated_todo.title
            todo.completed = updated_todo.completed
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    for i, todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(i)
            return {"message": "Todo deleted successfully"}
    raise HTTPException(status_code=404, detail="Todo not found")
