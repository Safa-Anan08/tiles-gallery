"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Welcome back 👋");
    router.push("/");
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
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-6">
          Login to your account
        </p>

        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <div className="my-6 text-center text-gray-400 text-sm">
          OR LOGIN WITH EMAIL
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-xl hover:scale-[1.02] transition">
            Login
          </button>

        </form>

        <p className="text-center mt-5 text-sm">
          Don’t have an account?
          <Link href="/register" className="ml-1 font-semibold text-black">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}