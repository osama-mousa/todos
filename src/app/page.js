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

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      order: todos.length,
    };

    setTodos([...todos, newTodo]);
    saveTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
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
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const updateTodo = (id, newText) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            text: newText.trim(),
            updatedAt: new Date().toISOString(),
          }
        : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    saveTodos(filteredTodos);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      const newTodos = arrayMove(todos, oldIndex, newIndex);
      setTodos(newTodos);
      saveTodos(newTodos);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Todos</h1>

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
