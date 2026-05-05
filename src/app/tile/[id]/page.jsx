"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";

export default function TileDetails() {
  const params = useParams();
  const id = params?.id;

  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  const session = authClient.useSession();

  useEffect(() => {
const loadTile = async () => {
  try {
    const res = await fetch(`http://localhost:5000/tiles/${id}`);

    if (!res.ok) {
      throw new Error("Tile not found");
    }

    const data = await res.json();
    setTile(data);

  } catch (err) {
    console.log("Error loading tile:", err);
  } finally {
    setLoading(false);
  }
};

    if (id) loadTile();
  }, [id]);

  const handleWishlist = async () => {
    if (!session?.data?.user) {
      toast.error("Please login first");
      return;
    }

    const wishlistData = {
      tileId: tile.id,
      title: tile.title,
      image: tile.image,
      price: tile.price,
      category: tile.category,
      description: tile.description,
      userEmail: session.data.user.email,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wishlistData),
    });

    const data = await res.json();

    if (data.message === "Already in wishlist") {
      toast.error("Already added to wishlist");
      return;
    }

    toast.success("Added to wishlist ");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!tile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">
          Tile not found
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-base-200 p-6 md:p-12">

      <div className="max-w-5xl mx-auto card bg-base-100 shadow-2xl">

    
        <figure>
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-[400px] object-cover"
          />
        </figure>

      
        <div className="card-body space-y-4">

          <h1 className="text-3xl font-bold">
            {tile.title}
          </h1>

          <p className="text-base-content/70">
            {tile.description}
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">

            <div className="p-4 border rounded-lg space-y-2">

              <p>
                <b>ID:</b> {tile.id}
              </p>

              <p>
                <b>Category:</b> {tile.category}
              </p>

              <p>
                <b>Material:</b> {tile.material}
              </p>

              <p>
                <b>Dimensions:</b> {tile.dimensions}
              </p>

            </div>

            <div className="p-4 border rounded-lg space-y-2">

              <p className="text-xl font-bold text-primary">
                Price: ${tile.price} {tile.currency}
              </p>

              <p>
                Status:
                <span
                  className={
                    tile.inStock
                      ? "text-green-500 ml-2"
                      : "text-red-500 ml-2"
                  }
                >
                  {tile.inStock
                    ? "In Stock"
                    : "Out of Stock"}
                </span>
              </p>

            </div>

          </div>

          <div className="flex gap-4 pt-4">

            <button
              onClick={handleWishlist}
              className="btn btn-error text-white"
            >
              <FaHeart className="text-white" /> Add Wishlist
            </button>


          </div>

        </div>

      </div>

    </section>
  );
}
