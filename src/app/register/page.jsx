"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image:
        image.trim() ||
        "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=8…",
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created 🎉");
    router.push("/login");
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Join Tiles Gallery
        </p>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Profile Image URL (optional)"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setImage(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-xl hover:scale-[1.02] transition">
            Register
          </button>

        </form>

        <p className="text-center mt-5 text-sm">
          Already have an account?
          <Link href="/login" className="ml-1 font-semibold text-black">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}