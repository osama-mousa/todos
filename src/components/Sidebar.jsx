"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleNewTodo = () => {
    router.push("/");
    setTimeout(() => {
      document.querySelector("input")?.focus();
    }, 100);
  };

  return (
    <div className="w-64 h-screen bg-gray-800 p-4 fixed left-0 top-0">
      <div className="space-y-4">
        <Link href="/" className="block p-2 hover:bg-gray-700 rounded">
          All Todos
        </Link>
        <Link href="/completed" className="block p-2 hover:bg-gray-700 rounded">
          Completed Todos
        </Link>
        <button
          onClick={handleNewTodo}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded"
        >
          New Todo
        </button>
      </div>
    </div>
  );
}
