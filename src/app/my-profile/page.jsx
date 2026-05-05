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


      if (user?.email) {
        const wishlistRes = await fetch(
          `/api/wishlist?email=${user.email}`
        );
        const data = await wishlistRes.json();
        setWishlist(data);
      }

      setLoading(false);
    };

    load();
  }, [router]);


  const handleRemove = async (tileId) => {
    if (!session?.email) return;

    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tileId,
        userEmail: session.email,
      }),
    });

    if (res.ok) {
      setWishlist((prev) =>
        prev.filter((item) => item.tileId !== tileId)
      );
      toast.success("Removed");
    } else {
      toast.error("Failed");
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


      <div className="max-w-xl mx-auto bg-base-100 shadow-2xl p-8 rounded-3xl text-center">

        <img
          src={user?.image || "/default.png"}
          className="w-28 h-28 rounded-full mx-auto"
        />

        <h2 className="text-3xl font-bold mt-5">
          {user?.name || "No Name"}
        </h2>

        <p className="opacity-70">
          {user?.email}
        </p>

        <Link href="/update-profile" className="btn btn-primary mt-5">
          Edit Profile
        </Link>

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
              <div key={tile._id} className="card bg-base-100 shadow-xl">

                <img
                  src={tile.image}
                  className="h-52 w-full object-cover"
                />

                <div className="card-body">

                  <h2 className="card-title">
                    {tile.title}
                  </h2>

                  <p className="text-sm opacity-70">
                    {tile.description}
                  </p>

                  <div className="flex justify-between mt-3">
                    <span className="font-bold text-primary">
                      ${tile.price}
                    </span>

                    <span className="badge">
                      {tile.category}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">

                    <Link
                      href={`/tile/${tile.tileId}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleRemove(tile.tileId)}
                      className="btn btn-error btn-sm text-white"
                    >
                      Remove <FaHeart />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </section>
  );
}