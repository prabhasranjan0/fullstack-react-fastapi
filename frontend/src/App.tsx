import { useEffect, useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./features/todos/todosSlice";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.items);
  const status = useAppSelector((state) => state.todos.status);
  const error = useAppSelector((state) => state.todos.error);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTodos()).catch((err) => {
        console.error("Failed to fetch todos:", err);
      });
    }
  }, [status, dispatch]);

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await dispatch(addTodo(newTodo)).unwrap();
      setNewTodo("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      await dispatch(
        updateTodo({
          ...todo,
          completed: !todo.completed,
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await dispatch(deleteTodo(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleSubmitEdit = async (todo: Todo) => {
    if (editingTitle.trim() === "") return;

    try {
      await dispatch(
        updateTodo({
          ...todo,
          title: editingTitle,
        })
      ).unwrap();
      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  if (status === "loading") {
    return (
      <div className="todo-app">
        <div className="loading">Loading todos...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="todo-app">
        <div className="error">Error: {error || "Failed to load todos"}</div>
      </div>
    );
  }

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>Todo App</h1>
      </header>

      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          className="todo-input"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new todo..."
        />
        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="empty-list">No todos yet. Add one above!</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo)}
                className="todo-checkbox"
              />
              {editingId === todo.id ? (
                <div className="todo-edit-form">
                  <input
                    type="text"
                    className="todo-input edit-input"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmitEdit(todo);
                      if (e.key === "Escape") cancelEditing();
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSubmitEdit(todo)}
                    className="todo-button edit-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="todo-button cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <span
                  className={`todo-text ${todo.completed ? "completed" : ""}`}
                  onDoubleClick={() => startEditing(todo)}
                >
                  {todo.title}
                </span>
              )}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="todo-delete"
                aria-label="Delete todo"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
