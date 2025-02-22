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
          className="bg-transparent text-red-400 px-3 py-2 rounded flex items-center gap-2 hover:bg-neutral-800"
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
          <div className="flex items-center justify-center h-[calc(50vh-50px)]">
            <div className="text-center p-4 text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-8 w-8 mx-auto mb-4 text-neutral-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
              <p className="text-lg">No completed tasks yet</p>
              <p className="text-sm mt-1">
                Complete some todos to see them here
              </p>
            </div>
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
