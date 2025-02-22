"use client";
import { useState, useEffect, useRef } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import TodoItem from "@/components/TodoItem";
import { saveTodos, getTodos } from "@/lib/todos";
import Image from "next/image";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setTodos(getTodos().filter((todo) => !todo.completed));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const allTodos = getTodos();
    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      order: allTodos.length,
    };

    const updatedTodos = [...allTodos, newTodo];
    saveTodos(updatedTodos);
    setTodos(updatedTodos.filter((todo) => !todo.completed));
    setInput("");
  };

  const toggleTodo = (id) => {
    const allTodos = getTodos();
    const updatedTodos = allTodos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
          completedAt: !todo.completed ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString(),
        };
      }
      return todo;
    });

    saveTodos(updatedTodos);
    setTodos(updatedTodos.filter((todo) => !todo.completed));

    if (updatedTodos.find((todo) => todo.id === id)?.completed) {
      const refreshedTodos = getTodos().filter((todo) => !todo.completed);
      setTodos(refreshedTodos);
    }
  };

  const updateTodo = (id, newText) => {
    const allTodos = getTodos();
    const updatedTodos = allTodos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            text: newText.trim(),
            updatedAt: new Date().toISOString(),
          }
        : todo
    );

    saveTodos(updatedTodos);
    setTodos(updatedTodos.filter((todo) => !todo.completed));
  };

  const deleteTodo = (id) => {
    const allTodos = getTodos();
    const updatedTodos = allTodos.filter((todo) => todo.id !== id);
    saveTodos(updatedTodos);
    setTodos(updatedTodos.filter((todo) => !todo.completed));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const allTodos = getTodos();
      const activeIndex = allTodos.findIndex((todo) => todo.id === active.id);
      const overIndex = allTodos.findIndex((todo) => todo.id === over.id);

      const newTodos = arrayMove(allTodos, activeIndex, overIndex);
      saveTodos(newTodos);
      setTodos(newTodos.filter((todo) => !todo.completed));
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-center">
        <Image
        className="flex mt-16 mb-8 text-center h-6 md:h-10 w-auto"
        src={"/icons/hero.png"}
        quality={100}
        height={10000}
        width={10000}
        alt={"ToDos"} />
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new todo..."
          className="w-full p-4 rounded-lg placeholder:text-neutral-600 bg-neutral-800 text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-500"
        />
      </form>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 w-full">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onUpdate={updateTodo}
                onDelete={deleteTodo}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-8 text-center">
        <a href="/completed" className="text-blue-400 hover:text-blue-300">
          View Completed Todos →
        </a>
      </div>
    </div>
  );
}
