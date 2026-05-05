"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaHeart } from "react-icons/fa";
import { toast } from "sonner";

export default function FeaturedTiles() {
  const [tiles, setTiles] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/tiles")
      .then((res) => res.json())
      .then((data) => setTiles(data));

    fetch("/api/auth/get-session")
      .then((res) => res.json())
      .then((data) => setSession(data?.user || null));
  }, []);

const handleWishlist = async (tile) => {
  if (!session?.email) {
    alert("Login first");
    return;
  }

  const res = await fetch("/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tileId: tile._id,
      title: tile.title,
      image: tile.image,
      price: tile.price,
      category: tile.category,
      userEmail: session.email,
    }),
  });

  if (res.ok) {
    toast.success("Added to wishlist ");
  }
};

  const featured = tiles.slice(0, 4);

  return (
    <section className="py-20 px-6 bg-[#f7f4ef]">

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#1f1f1f]">
          Featured Tiles
        </h2>
        <p className="text-gray-500 mt-2">
          Premium curated tiles for modern interiors
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {featured.map((tile) => (
          <div
            key={tile.id}
            className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden h-[450px]"
          >

            <img
              src={tile.image}
              className="h-48 w-full object-cover"
              alt={tile.title}
            />

            <div className="p-5 flex flex-col flex-1">

              <h2 className="text-lg font-semibold text-gray-800">
                {tile.title}
              </h2>

              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {tile.description}
              </p>

              {/* price + category */}
              <div className="flex justify-between mt-3">
                <span className="font-bold text-green-600">
                  ${tile.price}
                </span>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {tile.category}
                </span>
              </div>

          
              <div className="mt-auto flex flex-col gap-2">

                <button
                   onClick={() => handleWishlist(tile)}
    
                  className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  <FaHeart />
                  Wishlist
                </button>

                <Link
                  href={`/tile/${tile.id}`}
                  className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  <FaEye />
                  View Details
                </Link>

              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}