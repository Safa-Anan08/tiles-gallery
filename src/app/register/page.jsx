"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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
      "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  });

  if (error) {
    toast.error(error.message || "Registration failed");
    return;
  }

  toast.success("Registration successful 🎉");
  router.push("/login");
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
            Register
          </h2>


          <form onSubmit={handleRegister} className="space-y-4">

            <input
              type="text"
              placeholder="Name"
              className="input w-full border border-blue-400 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="input w-full border border-blue-400 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Photo URL"
              className="input w-full border border-blue-400 focus:outline-none"
              onChange={(e) => setImage(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="input w-full border border-blue-400 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-info w-full text-white">
              Register
            </button>

          </form>

        
          <button
            onClick={handleGoogle}
            className="btn btn-outline w-full mt-3"
          >
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?
            <Link href="/login" className="text-blue-500 ml-1">
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}