"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/Components/Loader/Loader"; // assumes a small spinner

export default function Home() {
  const router = useRouter();
  const [loadingButton, setLoadingButton] = useState(null); // 'admin' or 'student'

  const handleClick = (path, role) => {
    setLoadingButton(role);
    setTimeout(() => {
      router.push(path);
    }, 1000); // optional delay to show loader
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/Library.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-2xl text-center text-white shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to The Library
        </h1>
        <p className="mb-8 text-lg md:text-xl">
          Manage your library efficiently with modern tools.
        </p>
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => handleClick("/Admin", "admin")}
            className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            disabled={loadingButton === "admin"}
          >
            {loadingButton === "admin" ? <Loader size="sm" /> : "Admin Login"}
          </button>

          <button
            onClick={() => handleClick("/Student", "student")}
            className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            disabled={loadingButton === "student"}
          >
            {loadingButton === "student" ? <Loader size="sm" /> : "Student Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
