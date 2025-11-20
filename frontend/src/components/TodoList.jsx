import React from "react";

export default function TodoList({ todos = [], onDelete }) {
  if (!todos.length) return <p>No todos yet — add one!</p>;

  return (
    <ul className="todo-list">
      {todos.map((t) => (
        <li key={t._id} className="todo-item">
          <span>{t.text}</span>
          <button onClick={() => onDelete(t._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
