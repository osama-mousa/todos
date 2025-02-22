"use client";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "@/lib/todos";
import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function CompletedPage() {
  const [completedTodos, setCompletedTodos] = useState([]);

  const restoreTodo = (id) => {
    const todos = getTodos().map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: false,
          completedAt: null,
          updatedAt: new Date().toISOString(),
        };
      }
      return todo;
    });
    saveTodos(todos);
    setCompletedTodos(todos.filter((todo) => todo.completed));
  };

  const clearAllCompleted = () => {
    const activeTodos = getTodos().filter((todo) => !todo.completed);
    saveTodos(activeTodos);
    setCompletedTodos([]);
  };

  useEffect(() => {
    setCompletedTodos(getTodos().filter((todo) => todo.completed));
  }, []);

  return (
    <div className="w-full max-w-2xl p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Completed Todos</h1>
        <button
          onClick={clearAllCompleted}
          className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2"
          disabled={completedTodos.length === 0}
        >
          <TrashIcon className="w-5 h-5" />
          Clear All
        </button>
      </div>

      <div className="space-y-2">
        {completedTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            <span className="line-through text-neutral-400">{todo.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => restoreTodo(todo.id)}
                className="text-blue-400 hover:text-blue-300 p-2 rounded hover:bg-neutral-700"
                title="Restore Task"
              >
                <ArrowUturnLeftIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        {completedTodos.length === 0 && (
          <div className="p-4 text-center text-neutral-400 justify-center">
            No completed todos found
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-2"
        >
          ← Back to Active Todos
        </Link>
      </div>
    </div>
  );
}
