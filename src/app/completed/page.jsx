"use client";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "@/lib/todos";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
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

  useEffect(() => {
    setCompletedTodos(getTodos().filter((todo) => todo.completed));
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Completed Todos</h1>

      <div className="space-y-2">
        {completedTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg"
          >
            <span className="line-through text-gray-400">{todo.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => restoreTodo(todo.id)}
                className="text-blue-400 hover:text-blue-300"
                title="Restore Task"
              >
                <ArrowUturnLeftIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-400 hover:text-blue-300">
          ← Back to Active Todos
        </Link>
      </div>
    </div>
  );
}
