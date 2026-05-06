"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FaHeart,FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "@/wishlistButton/useWishlist";
import { useCartButton } from "@/cartButton/useCartButton";

export default function TileDetails() {
  const params = useParams();
  const id = params?.id;

  const [tile, setTile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    const loadTile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/tiles/${id}`);
        const data = await res.json();
        setTile(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadTile();
  }, [id]);

  const {
    isWishlisted,
    toggleWishlist,
    loading: wishLoading,
  } = useWishlist(tile, session?.data?.user);
   
   const {
  isCartAdded,
  toggleCart,
} = useCartButton(tile, session?.user);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!tile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold">Tile not found</h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="relative">
          <img
            src={tile.image}
            alt={tile.title}
            className="w-full h-[420px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          <h1 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white">
            {tile.title}
          </h1>
        </div>

        <div className="p-6 md:p-10 space-y-6">

          <p className="text-gray-600 leading-relaxed">
            {tile.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="p-5 rounded-2xl border bg-gray-50 space-y-2">
              <p><b>ID:</b> {tile.id}</p>
              <p><b>Category:</b> {tile.category}</p>
              <p><b>Material:</b> {tile.material}</p>
              <p><b>Dimensions:</b> {tile.dimensions}</p>
            </div>

            <div className="p-5 rounded-2xl border bg-gray-50 space-y-3">

              <p className="text-2xl font-bold text-green-600">
                ${tile.price} {tile.currency}
              </p>

              <p>
                Status:
                <span
                  className={`ml-2 font-semibold ${
                    tile.inStock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {tile.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </p>

            </div>

          </div>

          <div className="pt-4">

            <button
              onClick={toggleWishlist}
              disabled={wishLoading}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full
                font-semibold shadow-lg transition-all hover:scale-105
                ${
                  isWishlisted
                    ? "bg-gray-800 text-white"
                    : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                }
              `}
            >
              <FaHeart />
              {isWishlisted
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>
              <button
    onClick={toggleCart}
          className={`mt-4 flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg transition-all hover:scale-105
      ${
        isCartAdded
          ? "bg-gray-700 text-white"
          : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
       }
         `}
  >
    <FaShoppingCart />
    {isCartAdded ? "Remove from Cart" : "Add to Cart"}
  </button>

          </div>

        </div>
      </div>

    </section>
  );
}