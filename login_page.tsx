"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleRedirect = (role: string) => {
    if (role === "admin") {
      window.location.href = "http://localhost:3001"; // Admin / CEO
    }
    if (role === "employee") {
      window.location.href = "http://localhost:3002"; // Employee
    }
    if (role === "family") {
      window.location.href = "http://localhost:3003"; // Family
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 to-black text-white">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-10 w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to Hansonium
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Select your portal to continue
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleRedirect("admin")}
            className="bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg transition"
          >
            CEO / Admin Login
          </button>

          <button
            onClick={() => handleRedirect("employee")}
            className="bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg transition"
          >
            Employee Login
          </button>

          <button
            onClick={() => handleRedirect("family")}
            className="bg-gray-200 hover:bg-gray-300 text-black py-3 rounded-lg transition"
          >
            Family Login
          </button>
        </div>
      </div>
    </div>
  );
}