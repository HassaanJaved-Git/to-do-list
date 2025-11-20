import React, { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Fetch todos error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    if (!text?.trim()) return;
    try {
      const res = await fetch(`${BACKEND}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      console.error("Add todo error:", err);
    }
  };

  const deleteTodo = async (id) => {
    // optimistic UI
    const prev = todos;
    setTodos((t) => t.filter((x) => x._id !== id));
    try {
      await fetch(`${BACKEND}/todos/${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Delete todo error:", err);
      setTodos(prev); // rollback on error
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Todo (MERN)</h1>

        <TodoInput onAdd={addTodo} />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TodoList todos={todos} onDelete={deleteTodo} />
        )}
      </div>
    </div>
  );
}
