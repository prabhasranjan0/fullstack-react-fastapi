import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import "./App.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:8000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false,
        }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          completed: !todo.completed,
        }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t: Todo) => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo: Todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
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

  const submitEdit = async (todo: Todo) => {
    if (editingTitle.trim() === "") return;

    try {
      const response = await fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          title: editingTitle,
        }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t: Todo) => (t.id === todo.id ? updatedTodo : t)));
      setEditingId(null);
      setEditingTitle("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>Todo App</h1>
      </header>

      <form onSubmit={addTodo} className="todo-form">
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

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo)}
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
                    if (e.key === "Enter") submitEdit(todo);
                    if (e.key === "Escape") cancelEditing();
                  }}
                  autoFocus
                />
                <button
                  onClick={() => submitEdit(todo)}
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
              onClick={() => deleteTodo(todo.id)}
              className="todo-delete"
              aria-label="Delete todo"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
