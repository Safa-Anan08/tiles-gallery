"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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

    toast.success("Login successful");
    router.push("/");
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl">

        <div className="card-body">

          <h2 className="text-3xl font-bold text-center mb-4">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="input w-full border border-blue-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input w-full border border-blue-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-info w-full">
              Login
            </button>

          </form>

          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full mt-3"
          >
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            New here?
            <Link href="/register" className="text-blue-500 ml-1">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}