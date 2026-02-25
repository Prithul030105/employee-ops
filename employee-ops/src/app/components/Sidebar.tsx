"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "./images.png"; // ✅ correct relative import

export default function Sidebar({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Agentic Rostering", path: "/rostering" },
    { name: "DEX Audit Lab", path: "/dex-audit" },
    { name: "Staff Directory", path: "/staff" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 z-50
          bg-slate-900 text-white p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="relative w-42 h-30">
            <Image
              src={logo}
              alt="Company Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Mobile header */}
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h1 className="text-xl font-bold">Employee & Ops Hub</h1>
          <button onClick={closeSidebar}>✕</button>
        </div>

        {/* Desktop header */}
        <h1 className="hidden lg:block text-xl font-bold mb-8">
          Employee & Ops Hub
        </h1>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={closeSidebar}
              className={`block px-4 py-2 rounded-md transition ${
                pathname === item.path
                  ? "bg-slate-700"
                  : "hover:bg-slate-800 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}