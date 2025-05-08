"use client";
import { useEffect, useState } from "react";
import { getTodos, saveTodos } from "@/lib/todos";
import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CompletedPage() {
  const [completedTodos, setCompletedTodos] = useState([]);
  const router = useRouter();

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
    <div className="w-full max-w-2xl min-h-[80vh] flex flex-col p-4 font-sans">
      {/* المحتوى الرئيسي */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8 w-full gap-2 sm:gap-4">
          <h1 className="text-lg sm:text-3xl font-bold flex-shrink-0">
            Completed Todos
          </h1>
          {completedTodos.length > 0 && (
            <button
              onClick={clearAllCompleted}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-transparent text-red-400 px-2 sm:px-3 py-2 rounded flex items-center gap-1 sm:gap-2 hover:bg-neutral-800 cursor-pointer whitespace-nowrap flex-shrink-0"
              disabled={completedTodos.length === 0}
            >
              <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base sm:inline">Clear All</span>
            </button>
          )}
        </div>

        <div className="space-y-2">
          {completedTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
            >
              <span className="line-through text-neutral-400">{todo.text}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => restoreTodo(todo.id)}
                  onContextMenu={(e) => e.preventDefault()}
                  className="relative text-blue-400 hover:text-blue-300 p-2 rounded hover:bg-neutral-600 group"
                >
                  <ArrowUturnLeftIcon className="w-5 h-5" />
                  <span className="hidden md:inline-block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black text-xs text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg">
                    Restore Todo
                  </span>
                </button>
              </div>
            </div>
          ))}

          {completedTodos.length === 0 && (
            <div className="flex items-center justify-center h-[60vh]">
              <div className="text-center p-4 text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onContextMenu={(e) => e.preventDefault()}
                  className="h-8 w-8 mx-auto mb-4 text-neutral-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                  />
                </svg>
                <p className="text-lg sm:text-xl text-neutral-600">
                  No completed tasks yet
                </p>
                <p className="text-sm sm:text-base mt-2 text-neutral-600">
                  Complete some todos to see them here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* زر العودة */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push("/")}
          className="text-zinc-400 hover:text-zinc-300 transition-colors duration-200 flex items-center justify-center w-full group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width="24"
            height="22"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#404045"
            className="mr-1 transition-transform duration-300 transform group-hover:-translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to Active Todos
        </button>
      </div>
    </div>
  );
}
