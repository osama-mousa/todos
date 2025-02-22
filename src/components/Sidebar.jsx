"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
    if (window.innerWidth < 768) setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg md:hidden"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-white" />
        )}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 z-40 transition-transform w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 flex flex-col gap-4 mt-16 md:mt-0">
          <button
            onClick={() => {
              setIsOpen(false);
              handleNavigation("/");
            }}
            className="text-left p-2 hover:bg-gray-700 rounded"
          >
            All Todos
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              handleNavigation("/completed");
            }}
            className="text-left p-2 hover:bg-gray-700 rounded"
          >
            Completed Todos
          </button>

          {isOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
