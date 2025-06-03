from app.core.config import create_app
from app.api.todos import router as todos_router

app = create_app()
app.include_router(todos_router, tags=["todos"])
