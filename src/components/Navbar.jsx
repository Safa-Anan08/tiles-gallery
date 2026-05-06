"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const handleLogout = async () => {
    await authClient.signOut();
     router.replace("/");
  };

  const navLink = (href, label) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        pathname === href
          ? "text-blue-600"
          : "text-gray-600 hover:text-black"
      }`}
    >
      {label}
    </Link>
  );

useEffect(() => {
  const load = async () => {
    const currentSession = await authClient.getSession();

    const email = currentSession?.data?.user?.email;
      if (!session?.user?.email) {
      setCartCount(0);
      return;
    }

    const res = await fetch(`/api/cart?email=${email}`);
    const data = await res.json();

    setCartCount(data.length);
  };

  load();

  const handler = () => load();

  window.addEventListener("cart-updated", handler);

  return () => {
    window.removeEventListener("cart-updated", handler);
  };
}, [session]);

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">


      <div className="flex items-center gap-2">
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2">
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

      <div className="flex items-center gap-4">

        <Link
  href={session?.user ? "/cart" : "/login?redirect=/cart"}
  className="relative"
>
  <FaShoppingCart className="text-xl" />

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {cartCount}
    </span>
  )}
</Link>

       
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