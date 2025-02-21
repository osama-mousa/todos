import { useState } from "react";

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    onUpdate(todo.id, editText);
    setEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center space-x-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded border-gray-300"
        />

        {editing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
            className="flex-1 bg-transparent focus:outline-none"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
            onDoubleClick={() => setEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-400 hover:text-red-300"
      >
        Delete
      </button>
    </div>
  );
}
