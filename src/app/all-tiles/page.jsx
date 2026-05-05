"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch("http://localhost:5000/tiles");
      const data = await res.json();
      setTiles(data);
      setLoading(false);
    };

    loadData();
  }, []);


  const toggleWishlist = async (tile) => {
    try {
      const sessionRes = await fetch("/api/auth/get-session");
      const sessionData = await sessionRes.json();
      const user = sessionData?.user;

      if (!user?.email) {
        toast.error("Please login first");
        return;
      }

      const tileId = tile._id || tile.id;

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tileId,
          userEmail: user.email,
          title: tile.title,
          image: tile.image,
          price: tile.price,
          category: tile.category,
          description: tile.description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Added to wishlist ");
      } else {
        toast.error(data.error || "Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const filteredTiles = tiles
    .filter((t) =>
      category === "all" ? true : t.category === category
    )
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  const visibleTiles = filteredTiles.slice(0, visible);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 min-h-screen">

<div className="relative">

  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 3000 }}
    loop
    className="h-[420px]"
  >
    <SwiperSlide>
      <img
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400"
        className="w-full h-[420px] object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400"
        className="w-full h-[420px] object-cover"
      />
    </SwiperSlide>
  </Swiper>

  <div className="absolute inset-0 bg-black/60"></div>

  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">

    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Explore Premium Tiles
    </h1>

    <p className="text-gray-800 mb-6">
      Find your perfect tile design
    </p>

    <div className="w-full max-w-xl">
      <input
        type="text"
        placeholder="Search  "
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setVisible(8);
        }}
        className="
          w-full px-5 py-4 rounded-full
          bg-white/90 backdrop-blur-md
          text-black placeholder-gray-500
          shadow-2xl border border-white/40
          focus:outline-none focus:ring-2 focus:ring-white
          transition
        "
      />
    </div>

  </div>
</div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-end mb-6">
          <select
            className="p-2 border rounded"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="ceramic">Ceramic</option>
            <option value="marble">Marble</option>
            <option value="wood">Wood</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {visibleTiles.map((tile) => (
            <div
              key={tile._id || tile.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={tile.image}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">

                <h2 className="font-semibold">{tile.title}</h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {tile.description}
                </p>

                <div className="flex justify-between mt-2">
                  <span className="font-bold text-green-600">
                    ${tile.price}
                  </span>
                  <span className="text-xs">
                    {tile.category}
                  </span>
                </div>

                <div className="flex flex-col gap-2 mt-4">

                  <button
                    onClick={() => toggleWishlist(tile)}
                    className="flex items-center justify-center gap-2 
                    bg-red-500 text-white py-2 rounded-xl
                    hover:bg-red-600 transition"
                  >
                    <FaHeart />
                    Wishlist
                  </button>

                  <Link
                    href={`/tile/${tile._id || tile.id}`}
                    className="flex items-center justify-center 
                    bg-black text-white py-2 rounded-xl"
                  >
                    View Details
                  </Link>

                </div>

              </div>
            </div>
          ))}

        </div>

        {visible < filteredTiles.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisible((prev) => prev + 4)}
              className="px-5 py-2 border rounded"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </section>
  );
}