"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UpdateProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    image: "",
  });

  const handleUpdate = async () => {
    try {
      const session = await authClient.getSession();

      if (!session?.data?.user) {
        toast.error("Please login first");
        return;
      }

      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.data.user.email,
          name: form.name,
          image: form.image,
        }),
      });

      const data = await res.json();

      if (res.ok && data?.success) {
        toast.success("Profile updated successfully");
        router.push("/my-profile");
      } else {
        toast.error(data?.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">

        <h1 className="text-xl font-bold mb-5 text-center">
          Update Profile
        </h1>

        <input
          className="w-full p-2 border mb-3 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          Update
        </button>

      </div>

    </div>
  );
}