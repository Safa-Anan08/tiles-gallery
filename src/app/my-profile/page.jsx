"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import Link from "next/link";

export default function MyProfilePage() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    const load = async () => {
      const res = await authClient.getSession();

      if (!res?.data?.user) {
        toast.error("Please login first");
        router.push("/login");
        return;
      }

      const user = res.data.user;
      setSession(user);

      setEditForm({
        name: user.name || "",
        image: user.image || "",
      });

      const wishlistRes = await fetch(
        `/api/wishlist?email=${user.email}`
      );

      const data = await wishlistRes.json();
      setWishlist(data);

      setLoading(false);
    };

    load();
  }, [router]);

  const handleRemove = async (tileId) => {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tileId,
        userEmail: session.email,
      }),
    });

    if (res.ok) {
      setWishlist((prev) =>
        prev.filter((item) => item.tileId !== tileId)
      );
      toast.success("Removed from wishlist");
    } else {
      toast.error("Failed to remove");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.email,
          name: editForm.name,
          image: editForm.image,
        }),
      });

      if (res.ok) {
        toast.success("Profile updated");

        setSession((prev) => ({
          ...prev,
          name: editForm.name,
          image: editForm.image,
        }));

        setEditOpen(false);
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const user = session;

  return (
    <section className="min-h-screen bg-base-200 p-6 md:p-10">

      <div className="max-w-xl mx-auto bg-white shadow-2xl p-8 rounded-3xl text-center relative">

        <img
          src={user?.image || "/default.png"}
          className="w-28 h-28 rounded-full mx-auto border-4 border-black"
        />

        <h2 className="text-3xl font-bold mt-5">{user?.name}</h2>
        <p className="opacity-70">{user?.email}</p>

        <button
          onClick={() => setEditOpen(true)}
          className="mt-5 px-6 py-2 rounded-xl bg-black text-white hover:scale-105 transition"
        >
          Edit Profile
        </button>
      </div>

      <div className="mt-14">

        <h2 className="text-3xl font-bold mb-6 flex gap-3 items-center">
          Wishlist <FaHeart className="text-red-400" />
        </h2>

        {wishlist.length === 0 ? (
          <p className="opacity-60">No wishlist items</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {wishlist.map((tile) => (
              <div key={tile._id}
                className="group bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition">

                <img
                  src={tile.image}
                  className="h-52 w-full object-cover group-hover:scale-105 transition"
                />

                <div className="p-4">

                  <h2 className="font-bold text-lg">{tile.title}</h2>
                  <p className="text-sm opacity-70">{tile.description}</p>

                  <div className="flex justify-between mt-3">
                    <span className="font-bold text-black">
                      ${tile.price}
                    </span>

                    <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                      {tile.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">

                    <Link
                      href={`/tile/${tile.tileId}`}
                      className="px-3 py-2 bg-black text-white rounded-xl text-sm text-center hover:scale-105 transition"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemove(tile.tileId)}
                      className="px-3 py-2 rounded-xl border border-red-500 text-red-500 
                      hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2"
                    >
                      Remove from Wishlist<FaHeart />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[350px]">

            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input
              className="w-full p-2 border rounded mb-3"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full p-2 border rounded mb-3"
              value={editForm.image}
              onChange={(e) =>
                setEditForm({ ...editForm, image: e.target.value })
              }
              placeholder="Image URL"
            />

            <div className="flex gap-2">

              <button
                onClick={handleUpdateProfile}
                className="flex-1 bg-black text-white py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}