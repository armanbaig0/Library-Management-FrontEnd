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
    <div>
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/Library.jpg')",
      }}
    >
      <div className="bg-black  p-10 rounded-2xl text-center text-white shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to The Library
        </h1>
        <p className="mb-8 text-lg md:text-xl">
          Manage your library efficiently with modern tools.
        </p>
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => handleClick("/Admin", "admin")}
            className="relative cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            disabled={loadingButton === "admin"}
          >
            {loadingButton === "admin" ? <Loader size="sm" /> : "Admin Login"}
          </button>

          <button
            onClick={() => handleClick("/Student", "student")}
            className="relative cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            disabled={loadingButton === "student"}
          >
            {loadingButton === "student" ? <Loader size="sm" /> : "Student Login"}
          </button>
        </div>
      </div>
    </div>
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-6 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">LibraryX</h1>
        <nav className="space-x-6">
          <a href="#features" className="text-indigo-600 font-medium hover:underline">Features</a>
          <a href="#about" className="text-indigo-600 font-medium hover:underline">About</a>
          <a href="#contact" className="text-indigo-600 font-medium hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold text-gray-800 leading-tight mb-4">
            Manage Your Library Effortlessly
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Streamline your book management, track borrowed items, and enhance user experience with LibraryX.
          </p>
          <a href="/login" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow hover:bg-indigo-700 transition">
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-8 bg-white">
        <h3 className="text-3xl font-bold text-center text-indigo-600 mb-10">Features</h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-indigo-50 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">Book Inventory</h4>
            <p className="text-gray-600">Keep track of all books in your library, including availability and category details.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">Borrowing System</h4>
            <p className="text-gray-600">Efficiently manage book lending and returns with automated tracking features.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow">
            <h4 className="text-xl font-semibold text-indigo-700 mb-2">User Management</h4>
            <p className="text-gray-600">Easily handle user registrations, roles, and activity logs.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-8 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-purple-700 mb-6">About LibraryX</h3>
          <p className="text-lg text-gray-700">
            LibraryX is a modern library management solution built with simplicity and performance in mind. Whether you are running a school, college, or community library, LibraryX offers the tools you need to keep everything organized.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-indigo-600 mb-6">Get in Touch</h3>
          <p className="text-gray-700 mb-4">Have questions or need help getting started?</p>
          <a href="mailto:support@libraryx.com" className="text-indigo-600 underline font-medium">support@libraryx.com</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} LibraryX. All rights reserved.</p>
      </footer>
    </div>
    </div>
  );
}
