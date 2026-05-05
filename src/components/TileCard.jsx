"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TileCard({ tile }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);

    if (!liked) toast.success("Added to wishlist ❤️");
    else toast.error("Removed ❌");
  };

  return (
    <div className="card bg-base-100 shadow p-3">
      <img src={tile.image} className="h-40 w-full object-cover" />

      <h2 className="font-bold mt-2">{tile.title}</h2>

      <p className="text-sm text-gray-500">
        {tile.price} USD
      </p>

      <div className="flex justify-between mt-3">
        <button className="btn btn-sm">Details</button>

        <button onClick={handleLike}>
          {liked ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
}