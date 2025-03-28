"use client"
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-zinc-900 font-outfit">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <header className="bg-zinc-800 text-white p-4 font-outfit">
          <h1>Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
