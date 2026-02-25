"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f6f4ef]">
      
      {/* Sidebar */}
      <Sidebar
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 w-full">

        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-30">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 border rounded-md"
          >
            ☰
          </button>

          <span className="font-bold">
            Employee & Ops Hub
          </span>

          <div className="w-6" />
        </div>

        <main className="p-8 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}