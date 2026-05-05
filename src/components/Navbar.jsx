"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
  };

  const navLink = (href, label) => (
    <Link
      href={href}
      className={`block px-3 py-2 ${
        pathname === href ? "text-blue-600 font-semibold" : "text-gray-600"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">

      <div className="flex items-center gap-2">

        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost p-2">
            <Menu size={20} />
          </label>

          <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40 z-[100]">
            <li>{navLink("/", "Home")}</li>
            <li>{navLink("/all-tiles", "All Tiles")}</li>
            <li>{navLink("/my-profile", "Profile")}</li>
          </ul>
        </div>


        <Link href="/" className="text-xl font-bold text-gray-700 whitespace-nowrap">
          Tiles Gallery
        </Link>
      </div>


      <div className="hidden lg:flex items-center gap-4">
        {navLink("/", "Home")}
        {navLink("/all-tiles", "All Tiles")}
        {navLink("/my-profile", "Profile")}
      </div>


      <div className="flex items-center gap-2 whitespace-nowrap">
        {isPending ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : session?.user ? (
          <button onClick={handleLogout} className="btn btn-error btn-sm">
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}