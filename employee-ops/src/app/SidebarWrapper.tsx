"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar"; // adjust path if needed

export default function SidebarWrapper() {
  const [isOpen, setIsOpen] = useState(true);
  return <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />;
}