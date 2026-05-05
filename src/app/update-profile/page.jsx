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
  const session = await authClient.getSession();

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

  if (res.ok) {
    alert("Profile updated successfully");
  } else {
    alert("Update failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[350px] shadow">

        <h1 className="text-xl font-bold mb-4">Update Profile</h1>

        <input
          className="w-full p-2 border mb-3"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full p-2 border mb-3"
          placeholder="Image URL"
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-2 rounded"
        >
          Update
        </button>

      </div>
    </div>
  );
}