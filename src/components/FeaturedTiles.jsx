"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaEye, FaHeart } from "react-icons/fa";
import { useWishlist } from "@/wishlistButton/useWishlist";

function TileCard({ tile, session }) {
  const { isWishlisted, toggleWishlist } = useWishlist(tile, session);

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden">
      
      <div className="relative">
        <img
          src={tile.image}
          className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
      </div>

      <div className="p-5">

        <h2 className="font-semibold text-lg">{tile.title}</h2>

        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {tile.description}
        </p>

        <div className="flex justify-between mt-3">
          <span className="font-bold text-green-600">
            ${tile.price}
          </span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {tile.category}
          </span>
        </div>

        <button
          onClick={toggleWishlist}
          className={`w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl font-medium transition
            ${isWishlisted
              ? "bg-gray-800 text-white"
                    : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
            }`}
        >
          <FaHeart />
          {isWishlisted ? "Remove from Wishlist" : "Wishlist"}
        </button>

        <Link
          href={`/tile/${tile.id}`}
          className="block text-center mt-2 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition"
        >
          <FaEye className="inline mr-1" />
          View Details
        </Link>

      </div>
    </div>
  );
}

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

  const featured = tiles.slice(0, 4);

  return (
    <section className="py-20 px-6 bg-[#f7f4ef]">

      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          Featured Tiles
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {featured.map((tile) => (
          <TileCard
            key={tile.id}
            tile={tile}
            session={session}
          />
        ))}

      </div>
    </section>
  );
}