"use client";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "@/lib/todos";

export default function CompletedPage() {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    setCompletedTodos(getTodos().filter((todo) => todo.completed));
  }, []);

  const clearCompleted = () => {
    const todos = getTodos().filter((todo) => !todo.completed);
    saveTodos(todos);
    setCompletedTodos([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Completed Todos</h1>
        <button
          onClick={clearCompleted}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2">
        {completedTodos.map((todo) => (
          <div
            key={todo.id}
            className="p-4 bg-gray-800 rounded-lg line-through text-gray-400"
          >
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
}
