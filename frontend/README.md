# Todo App Frontend

A modern, responsive Todo application built with React and TypeScript. This frontend application provides a clean and intuitive interface for managing todos.

## Technology Stack

- React 18+
- TypeScript
- Vite: Next Generation Frontend Tooling
- Pure CSS for styling (no UI frameworks)

## Project Structure

```
frontend/
├── src/
│   ├── App.tsx        # Main application component
│   ├── App.css        # Application styles
│   ├── main.tsx       # Application entry point
│   └── assets/        # Static assets
├── public/            # Public assets
├── index.html         # HTML entry point
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Features

- ✨ Clean and Modern UI
- 📱 Fully Responsive Design
- 🎯 TypeScript for Type Safety
- ⚡ Fast Development with Vite
- 🔄 Real-time Updates
- 🎨 Custom CSS with Modern Design Patterns

## Functionality

- Add new todos
- Mark todos as complete/incomplete
- Delete existing todos
- Responsive layout that works on all screen sizes
- Clean and intuitive user interface

## CSS Features

The application uses modern CSS features including:

- CSS Variables for theming
- Flexbox for layout
- CSS Grid for responsive design
- Modern animations and transitions
- Mobile-first approach

## Setup and Running

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The application will start on `http://localhost:5173`.

## API Integration

The frontend integrates with the FastAPI backend running on `http://localhost:8000` and includes:

- Fetch API for HTTP requests
- Error handling for API calls
- TypeScript interfaces for API responses

## Responsive Design Breakpoints

The application is responsive with the following breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript type checking
