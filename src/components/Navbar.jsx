"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
  setOpen(false); 
  };
  const handleLogout = async () => {
    await authClient.signOut();
  };

const navLink = (href, label) => (
  <Link
    href={href}
    onClick={() => setOpen(false)}   // ✅ IMPORTANT FIX
    className={`px-3 py-2 rounded-md text-sm font-medium ${
      pathname === href
        ? "text-blue-600"
        : "text-gray-600 hover:text-black"
    }`}
  >
    {label}
  </Link>
);
  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">

       <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2"
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="text-xl font-bold">
          Tiles Gallery
        </Link>
      </div>

      <div className="hidden lg:flex gap-4">
        {navLink("/", "Home")}
        {navLink("/all-tiles", "All Tiles")}
        {navLink("/my-profile", "Profile")}
      </div>

      <div className="flex items-center gap-2">
        {isPending ? (
          <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        ) : session?.user ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
          >
            Login
          </Link>
        )}
      </div>

     
      {open && (
  <div className="absolute top-14 left-0 w-full bg-white shadow-md lg:hidden flex flex-col p-3 gap-2">
    {navLink("/", "Home")}
    {navLink("/all-tiles", "All Tiles")}
    {navLink("/my-profile", "Profile")}
  </div>
)}
    </nav>
  );
}