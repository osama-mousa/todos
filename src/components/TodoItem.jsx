"use client";
import { useState, useEffect, useRef } from "react";
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
  const menuRef = useRef(null);
  const infoRef = useRef(null);
  const infoButtonRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: todo.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowInfo(false);
      }
      if (
        infoRef.current &&
        !infoRef.current.contains(e.target) &&
        !infoButtonRef.current.contains(e.target)
      ) {
        setShowInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg relative mb-2
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

        <label className="relative flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="w-5 h-5 rounded border-2 border-neutral-400 bg-transparent 
             checked:bg-green-500 checked:border-green-500 
             focus:ring-0 focus:ring-offset-0 
             appearance-none cursor-pointer 
             transition-colors duration-200 opacity-0 absolute"
            aria-label={
              todo.completed ? "Mark as incomplete" : "Mark as complete"
            }
          />
          <div className="w-5 h-5 rounded border-2 border-neutral-400 flex items-center justify-center">
            <svg
              className={`w-3 h-3 text-white transition-opacity duration-200 ${
                todo.completed ? "opacity-100" : "opacity-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </label>

        {/* Todo Text Input/Display */}
        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleUpdate}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
              className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-500 rounded py-1 px-2"
              autoFocus
            />
          ) : (
            <span
              className={`block break-words overflow-hidden ${
                todo.completed
                  ? "line-through text-neutral-400"
                  : "text-neutral-100"
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
          ref={infoButtonRef}
          onClick={() => setShowInfo(!showInfo)}
          className="text-neutral-400 hover:text-white relative group"
          aria-label="Task information"
          //   title="View task details"
        >
          <InformationCircleIcon className="w-5 h-5" />

          {/* Tooltip للـ hover */}
          <span
            className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
          bg-neutral-950 text-xs text-white rounded-lg opacity-0 group-hover:opacity-100 
          transition-opacity duration-200 pointer-events-none"
          >
            Info
          </span>
        </button>

        <Menu as="div" className="relative" ref={menuRef}>
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
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-neutral-800 rounded-lg shadow-lg z-50 focus:outline-none border border-neutral-700">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setEditing(true)}
                    className={`${
                      active ? "bg-neutral-700" : ""
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
                      active ? "bg-neutral-700" : ""
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
        <div
          ref={infoRef}
          className="absolute top-full left-0 w-full p-4 bg-neutral-800 rounded-lg mt-2 z-50 shadow-xl border border-neutral-700"
        >
          <button
            className="flex w-full items-center justify-end mt-0 mb-2 text-sm text-red-400 hover:text-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
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
