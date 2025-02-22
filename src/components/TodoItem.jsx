"use client";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  InformationCircleIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [showInfo, setShowInfo] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
    }
    setEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg group relative mb-2
        hover:bg-zinc-800 transition-colors w-full"
    >
      {/* Drag Handle and Checkbox */}
      <div className="flex items-center gap-3 flex-1">
        <button
          {...listeners}
          aria-label="Drag handle"
          className="handle cursor-grab active:cursor-grabbing p-2 hover:bg-neutral-700 rounded-md"
        >
          <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9 20q-.825 0-1.412-.587Q7 18.825 7 18q0-.825.588-1.413Q8.175 16 9 16t1.413.587Q11 17.175 11 18q0 .825-.587 1.413Q9.825 20 9 20Zm0-6q-.825 0-1.412-.588Q7 12.825 7 12t.588-1.413Q8.175 10 9 10t1.413.587Q11 11.175 11 12q0 .825-.587 1.412Q9.825 14 9 14Zm0-6q-.825 0-1.412-.588Q7 6.825 7 6t.588-1.412Q8.175 4 9 4t1.413.588Q11 5.175 11 6t-.587 1.412Q9.825 8 9 8Zm6 0q-.825 0-1.412-.588Q13 6.825 13 6t.588-1.412Q14.175 4 15 4t1.413.588Q17 5.175 17 6t-.587 1.412Q15.825 8 15 8Zm0 6q-.825 0-1.412-.588Q13 12.825 13 12t.588-1.413Q14.175 10 15 10t1.413.587Q17 11.175 17 12q0 .825-.587 1.412Q15.825 14 15 14Zm0 6q-.825 0-1.412-.587Q13 18.825 13 18q0-.825.588-1.413Q14.175 16 15 16t1.413.587Q17 17.175 17 18q0 .825-.587 1.413Q15.825 20 15 20Z"
            />
          </svg>
        </button>

        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded border-neutral-300 bg-neutral-700 checked:bg-blue-500"
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
        />

        {/* Todo Text Input/Display */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              className="w-full flex-1 bg-transparent focus:outline-none"
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 text-neutral-100 ${
                todo.completed ? "line-through text-neutral-400" : ""
              }`}
              onDoubleClick={() => setEditing(true)}
            >
              {todo.text}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 ml-4">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="text-neutral-400 hover:text-white hidden md:inline-block"
          aria-label="Task information"
        >
          <InformationCircleIcon className="w-5 h-5" />
        </button>

        <Menu as="div" className="relative">
          <Menu.Button
            className="text-neutral-400 hover:text-white"
            aria-label="Task actions"
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </Menu.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-neutral-700 rounded-lg shadow-lg z-50 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setEditing(true)}
                    className={`${
                      active ? "bg-neutral-600" : ""
                    } w-full px-4 py-3 text-left rounded-t-lg flex items-center gap-2`}
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onDelete(todo.id)}
                    className={`${
                      active ? "bg-neutral-600" : ""
                    } w-full px-4 py-3 text-left rounded-b-lg text-red-400 flex items-center gap-2`}
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Information Panel */}
      {showInfo && (
        <div className="hidden md:block absolute top-full left-0 w-full p-4 bg-neutral-700 rounded-lg mt-2 z-50 shadow-xl">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">Created:</span>
              <span>{new Date(todo.createdAt).toLocaleString()}</span>
            </div>
            {todo.updatedAt && (
              <div className="flex justify-between">
                <span className="text-neutral-400">Updated:</span>
                <span>{new Date(todo.updatedAt).toLocaleString()}</span>
              </div>
            )}
            {todo.completedAt && (
              <div className="flex justify-between">
                <span className="text-neutral-400">Completed:</span>
                <span>{new Date(todo.completedAt).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
