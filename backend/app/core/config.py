from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .middleware import ErrorHandlerMiddleware, RequestLoggingMiddleware


def create_app() -> FastAPI:
    app = FastAPI(
        title="Todo API",
        description="FastAPI Todo Application with Error Handling and Logging",
        version="1.0.0",
    )

    # Add middleware in order
    # 1. Request Logging - Should be first to log all requests
    app.add_middleware(RequestLoggingMiddleware)

    # 2. Error Handler - Should be before CORS to catch all errors
    app.add_middleware(ErrorHandlerMiddleware)

    # 3. CORS - Should be last in the chain
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],  # React dev server
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
