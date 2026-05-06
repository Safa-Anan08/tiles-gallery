"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function MyProfilePage() {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
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

        const [wishlistRes, cartRes] = await Promise.all([
          fetch(`/api/wishlist?email=${user.email}`),
          fetch(`/api/cart?email=${user.email}`),
        ]);

        const wishlistData = await wishlistRes.json();
        const cartData = await cartRes.json();

        setWishlist(wishlistData || []);
        setCart(cartData || []);
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleRemoveWishlist = async (tileId) => {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tileId,
        userEmail: session?.email,
      }),
    });

    if (res.ok) {
      setWishlist((prev) =>
        prev.filter((item) => (item.tileId || item.id) !== tileId)
      );
      toast.success("Removed from wishlist");
    }
  };

  const handleUpdateProfile = async () => {
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session?.email,
        name: editForm.name,
        image: editForm.image,
      }),
    });

    if (res.ok) {
      setSession({
        ...session,
        name: editForm.name,
        image: editForm.image,
      });

      toast.success("Profile updated");
      setEditOpen(false);
    } else {
      toast.error("Update failed");
    }
  };

  if (loading) return <Loader />;

  const user = session;

  return (
    <section className="min-h-screen bg-base-200 p-6 md:p-10">

      <div className="max-w-xl mx-auto bg-white shadow-2xl p-8 rounded-3xl text-center">
        <img
          src={user?.image || "/default.png"}
          className="w-28 h-28 rounded-full mx-auto border-4 border-black"
        />

        <h2 className="text-3xl font-bold mt-5">{user?.name}</h2>
        <p className="opacity-70">{user?.email}</p>

        <button
          onClick={() => setEditOpen(true)}
          className="mt-5 px-6 py-2 rounded-xl bg-black text-white"
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
          <div className="grid md:grid-cols-3 gap-6">

            {wishlist.map((tile) => {
              const id = tile.tileId || tile.id;

              return (
                <div key={id} className="bg-white shadow-xl rounded-2xl p-4">

                  <img src={tile.image} className="h-52 w-full object-cover" />

                  <h2 className="font-bold mt-2">{tile.title}</h2>

                  <div className="flex justify-between mt-2">
                    <span>${tile.price}</span>
                    <span>{tile.category}</span>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">

                    <Link
                      href={`/tile/${id}`}
                      className="bg-black text-white py-2 rounded-xl text-center"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleRemoveWishlist(id)}
                      className="border border-red-500 text-red-500 py-2 rounded-xl"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>

      <div className="mt-14">
        <h2 className="text-3xl font-bold mb-6 flex gap-3 items-center">
          Cart <FaShoppingCart />
        </h2>

        {cart.length === 0 ? (
          <p className="opacity-60">No cart items</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">

            {cart.map((item) => {
              const id = item.tileId || item.id;

              return (
                <div key={id} className="bg-white shadow-xl rounded-2xl p-4">

                  <img src={item.image} className="h-52 w-full object-cover" />

                  <h2 className="font-bold mt-2">{item.title}</h2>

                  <p>Qty: {item.quantity || 1}</p>

                  <button
                    onClick={async () => {
                      const res = await fetch("/api/cart", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          tileId: id,
                          userEmail: session?.email,
                        }),
                      });

                      if (res.ok) {
                        setCart((prev) =>
                          prev.filter((c) => (c.tileId || c.id) !== id)
                        );
                        toast.success("Removed from cart");
                      }
                    }}
                    className="w-full mt-3 border border-red-500 text-red-500 py-2 rounded-xl"
                  >
                    Remove
                  </button>

                </div>
              );
            })}

          </div>
        )}
      </div>

      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-2xl w-[350px]">

            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

            <input
              className="w-full p-2 border mb-3"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full p-2 border mb-3"
              value={editForm.image}
              onChange={(e) =>
                setEditForm({ ...editForm, image: e.target.value })
              }
              placeholder="Image URL"
            />

            <div className="flex gap-2">

              <button
                onClick={handleUpdateProfile}
                className="flex-1 bg-black text-white py-2"
              >
                Save
              </button>

              <button
                onClick={() => setEditOpen(false)}
                className="flex-1 border py-2"
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