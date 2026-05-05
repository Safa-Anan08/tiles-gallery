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
    const sessionRes = await fetch("http://localhost:5000/tiles");
    const session = await sessionRes.json();

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tileId: tile.id,
        userEmail: session.user.email,
        title: tile.title,
        image: tile.image,
        price: tile.price,
        category: tile.category,
        description: tile.description,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message ||  <span>
    Wishlist updated <FaHeart className="text-red-400 inline" />
  </span>);
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
  <section className="bg-base-200 min-h-screen">

   
    
<div className="relative">

  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 3000 }}
    loop={true}
    className="h-[420px]"
  >
    <SwiperSlide>
      <img
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400"
        className="w-full h-[420px] object-cover"
        alt="Tile 1"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400"
        className="w-full h-[420px] object-cover"
        alt="Tile 2"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400"
        className="w-full h-[420px] object-cover"
        alt="Tile 3"
      />
    </SwiperSlide>
  </Swiper>

  <div className="absolute inset-0 bg-black/50 z-10"></div>


  <div className="absolute inset-0 flex items-center justify-center text-center z-20 px-6">
    <div className="max-w-3xl text-white">
      <h1 className="animate__animated animate__fadeInDown mb-5 text-5xl font-bold">
        Explore Premium Tiles
      </h1>

      <p className="mb-6 text-lg">
        Discover elegant ceramic, marble and wood tiles for
        your dream interior design.
      </p>

      <input
        type="text"
        placeholder="Search tiles by title..."
        className="input input-bordered w-full max-w-xl bg-white text-black"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  </div>

</div>

    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-end mb-8">
        <div className="w-full md:w-52">
          <select
            className="select select-bordered w-full bg-base-100 shadow-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="ceramic">Ceramic</option>
            <option value="marble">Marble</option>
            <option value="wood">Wood</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {visibleTiles.map((tile) => (
          <div
            key={tile.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
          >
            <img
              src={tile.image}
              className="h-52 w-full object-cover"
              alt={tile.title}
            />

            <div className="card-body px-3 py-3">
              <h2 className="card-title">{tile.title}</h2>

              <p className="text-sm opacity-70 line-clamp-2">
                {tile.description}
              </p>

              <div className="flex justify-between mt-2">
                <span className="font-bold text-primary">
                  ${tile.price}
                </span>
                <span className="text-xs">{tile.category}</span>
              </div>
               <div className="mt-auto flex flex-col gap-2">
              <button
                onClick={() => toggleWishlist(tile)}
                className="flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FaHeart className="text-red-400" /> Wishlist
              </button>

              <Link
                href={`/tile/${tile.id}`}
                className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
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
            className="btn btn-outline"
            onClick={() => setVisible((prev) => prev + 4)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  </section>
);}