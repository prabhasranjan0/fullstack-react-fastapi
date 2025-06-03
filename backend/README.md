# Todo App Backend

This is the backend service for the Todo application built with FastAPI. It provides a RESTful API for managing todos with in-memory storage.

## Technology Stack

- FastAPI: Modern, fast web framework for building APIs with Python
- Pipenv: Python dependency management tool
- Uvicorn: ASGI server for running the FastAPI application

## Project Structure

```
backend/
├── main.py          # Main application file with API endpoints
├── Pipfile          # Pipenv dependencies file
└── Pipfile.lock     # Pipenv lock file for deterministic builds
```

## API Endpoints

The API provides the following endpoints:

- `GET /todos`: Retrieve all todos
- `POST /todos`: Create a new todo
- `PUT /todos/{todo_id}`: Update an existing todo
- `DELETE /todos/{todo_id}`: Delete a todo

### Data Model

```python
class Todo:
    id: int          # Unique identifier
    title: string    # Todo title
    completed: bool  # Completion status
```

## Setup and Running

1. Install dependencies:

   ```bash
   pipenv install
   ```

2. Start the server:
   ```bash
   pipenv run uvicorn main:app --reload
   ```

The server will start on `http://localhost:8000`.

## CORS Configuration

The backend is configured to accept requests from the frontend running on `http://localhost:5173` with the following CORS settings:

- Allowed origins: http://localhost:5173
- Allowed methods: All methods (\*)
- Allowed headers: All headers (\*)
- Credentials: Enabled

## API Documentation

FastAPI automatically generates API documentation. Once the server is running, you can access:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
