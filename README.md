# Full Stack Todo Application

A modern, responsive Todo application built with React (Frontend) and FastAPI (Backend). This project demonstrates a clean architecture for a full-stack web application with a focus on type safety and modern development practices.

## Project Structure

```
react-fastapi/
├── frontend/          # React TypeScript frontend
│   ├── src/          # Source files
│   ├── public/       # Public assets
│   └── README.md     # Frontend documentation
└── backend/          # FastAPI Python backend
    ├── main.py       # Main application file
    └── README.md     # Backend documentation
```

## Technology Stack

### Frontend

- React 18+ with TypeScript
- Vite for fast development
- Pure CSS for styling (no UI frameworks)
- Modern responsive design

### Backend

- FastAPI (Python)
- Pipenv for dependency management
- In-memory data store
- CORS enabled for frontend integration

## Quick Start

### Starting the Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
pipenv install
```

3. Start the FastAPI server:

```bash
pipenv run uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`.

### Starting the Frontend

1. In a new terminal, navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Features

- ✨ Modern, responsive UI
- 🚀 Fast API with Python
- 💪 Type safety with TypeScript
- 🎨 Clean, custom CSS design
- 🔄 Real-time updates
- 📱 Mobile-first approach

## API Documentation

Once the backend is running, you can access:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Development

### Backend Development

The backend uses FastAPI with the following features:

- RESTful API design
- Pydantic for data validation
- CORS middleware for frontend integration
- In-memory data store for todos

### Frontend Development

The frontend is built with modern web technologies:

- React with TypeScript for type safety
- Vite for fast development experience
- Custom CSS with modern features
- Responsive design for all screen sizes

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
