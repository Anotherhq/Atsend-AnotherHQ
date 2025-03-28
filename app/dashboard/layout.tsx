"use client"
import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-full bg-[#111111] font-outfit">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1">
        {/* Page Content */}
        <Navbar />
        <main className="p-6 rounded-tl-4xl overflow-hidden   bg-[#111111] h-full ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
