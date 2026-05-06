// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { FaHeart } from "react-icons/fa";
// // import { toast } from "sonner";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay } from "swiper/modules";

// // import "swiper/css";

// // export default function AllTilesPage() {
// //   const [tiles, setTiles] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [search, setSearch] = useState("");
// //   const [category, setCategory] = useState("all");
// //   const [visible, setVisible] = useState(8);

// //   const [user, setUser] = useState(null);
// //   const [wishlist, setWishlist] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:5000/tiles")
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setTiles(data);
// //         setLoading(false);
// //       });
// //   }, []);

// //   useEffect(() => {
// //     fetch("/api/auth/get-session")
// //       .then((res) => res.json())
// //       .then((data) => setUser(data?.user || null));
// //   }, []);

// //   useEffect(() => {
// //     if (!user?.email) return;

// //     fetch(`/api/wishlist?email=${user.email}`)
// //       .then((res) => res.json())
// //       .then((data) => setWishlist(data || []));
// //   }, [user]);

// //   const isWishlisted = (tileId) => {
// //     return wishlist.some((item) => item.tileId === tileId);
// //   };

// //   const toggleWishlist = async (tile) => {
// //     if (!user?.email) {
// //       toast.error("Please login first");
// //       return;
// //     }

// //     const tileId = tile._id || tile.id;
// //     const already = isWishlisted(tileId);

// //     try {
// //       if (!already) {
// //         const res = await fetch("/api/wishlist", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             tileId,
// //             userEmail: user.email,
// //             title: tile.title,
// //             image: tile.image,
// //             price: tile.price,
// //             category: tile.category,
// //             description: tile.description,
// //           }),
// //         });

// //         if (res.ok) {
// //           setWishlist((prev) => [...prev, { tileId }]);
// //           toast.success("Added to wishlist ❤️");
// //         }
// //       } else {
// //         const res = await fetch("/api/wishlist", {
// //           method: "DELETE",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             tileId,
// //             userEmail: user.email,
// //           }),
// //         });

// //         if (res.ok) {
// //           setWishlist((prev) =>
// //             prev.filter((item) => item.tileId !== tileId)
// //           );
// //           toast.success("Removed from wishlist 💔");
// //         }
// //       }
// //     } catch (err) {
// //       toast.error("Something went wrong");
// //     }
// //   };

// //   const filteredTiles = tiles
// //     .filter((t) => (category === "all" ? true : t.category === category))
// //     .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

// //   const visibleTiles = filteredTiles.slice(0, visible);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <span className="loading loading-spinner loading-lg"></span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <section className="bg-gray-100 min-h-screen">

// //       <div className="relative">
// //         <Swiper
// //           modules={[Autoplay]}
// //           autoplay={{ delay: 3000 }}
// //           loop
// //           className="h-[420px]"
// //         >
// //           <SwiperSlide>
// //             <img
// //               src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
// //               className="w-full h-[420px] object-cover"
// //             />
// //           </SwiperSlide>
// //         </Swiper>

// //         <div className="absolute inset-0 bg-black/60"></div>

// //         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">

// //           <h1 className="text-4xl font-bold text-white mb-4">
// //             Explore Premium Tiles
// //           </h1>

// //           <input
// //             type="text"
// //             placeholder="Search tiles..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             className="w-full max-w-xl px-5 py-4 rounded-full bg-white text-black"
// //           />
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-6 py-6 flex justify-end">
// //         <select
// //           className="p-2 border rounded"
// //           onChange={(e) => setCategory(e.target.value)}
// //         >
// //            <option value="all">All</option>
// //            <option value="ceramic">Ceramic</option>
// //            <option value="marble">Marble</option>
// //            <option value="porcelain">Porcelain</option>
// //            <option value="stone">Stone</option>
// //            <option value="glass">Glass</option>
// //            <option value="cement">Cement</option>
// //            <option value="wood-look">Wood Look</option>
// //         </select>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// //         {visibleTiles.map((tile) => {
// //           const id = tile._id || tile.id;
// //           const active = isWishlisted(id);

// //           return (
// //             <div
// //               key={id}
// //               className="bg-white rounded-2xl shadow hover:shadow-xl transition"
// //             >
// //               <img src={tile.image} className="h-52 w-full object-cover" />

// //               <div className="p-4">

// //                 <h2 className="font-semibold">{tile.title}</h2>

// //                 <p className="text-sm text-gray-500 line-clamp-2">
// //                   {tile.description}
// //                 </p>

// //                 <div className="flex justify-between mt-2">
// //                   <span className="font-bold text-green-600">
// //                     ${tile.price}
// //                   </span>
// //                   <span className="text-xs">{tile.category}</span>
// //                 </div>

// //                 <button
// //                   onClick={() => toggleWishlist(tile)}
// //                   className={`flex items-center justify-center gap-2 w-full mt-3 py-2 rounded-xl transition font-medium
// //                     ${
// //                       active
// //                         ? "bg-gray-800 text-white"
// //                     : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
// //                     }`}
// //                 >
// //                   <FaHeart />
// //                   {active ? "Remove" : "Wishlist"}
// //                 </button>

// //                 <Link
// //                   href={`/tile/${id}`}
// //                   className="block text-center mt-2 bg-black text-white py-2 rounded-xl"
// //                 >
// //                   View Details
// //                 </Link>

// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //     </section>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import TileCard from "@/components/TileCard";
// import { authClient } from "@/lib/auth-client";

// import "swiper/css";

// export default function AllTilesPage() {
//   const [tiles, setTiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("all");
//   const [visible, setVisible] = useState(8);

//   const { data: session } = authClient.useSession();

//   useEffect(() => {
//     fetch("http://localhost:5000/tiles")
//       .then((res) => res.json())
//       .then((data) => {
//         setTiles(data);
//         setLoading(false);
//       });
//   }, []);

//   const filteredTiles = tiles
//     .filter((t) => (category === "all" ? true : t.category === category))
//     .filter((t) =>
//       t.title.toLowerCase().includes(search.toLowerCase())
//     );

//   const visibleTiles = filteredTiles.slice(0, visible);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-gray-100 min-h-screen">

//       {/* Banner */}
//       <div className="relative">
//         <Swiper
//           modules={[Autoplay]}
//           autoplay={{ delay: 3000 }}
//           loop
//           className="h-[420px]"
//         >
//           <SwiperSlide>
//             <img
//               src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
//               className="w-full h-[420px] object-cover"
//             />
//           </SwiperSlide>
//         </Swiper>

//         <div className="absolute inset-0 bg-black/60"></div>

//         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
//           <h1 className="text-4xl font-bold text-white mb-4">
//             Explore Premium Tiles
//           </h1>

//           <input
//             type="text"
//             placeholder="Search tiles..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full max-w-xl px-5 py-4 rounded-full bg-white text-black"
//           />
//         </div>
//       </div>

//       {/* Filter */}
//       <div className="max-w-7xl mx-auto px-6 py-6 flex justify-end">
//         <select
//           className="p-3 border rounded-xl"
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="all">All</option>
//           <option value="ceramic">Ceramic</option>
//           <option value="marble">Marble</option>
//           <option value="porcelain">Porcelain</option>
//           <option value="stone">Stone</option>
//           <option value="glass">Glass</option>
//           <option value="cement">Cement</option>
//           <option value="wood-look">Wood Look</option>
//         </select>
//       </div>

//       {/* Tiles */}
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {visibleTiles.map((tile) => (
//           <TileCard
//             key={tile._id || tile.id}
//             tile={tile}
//             session={session?.user}
//           />
//         ))}
//       </div>

//       {/* Load More */}
//       {visible < filteredTiles.length && (
//         <div className="text-center py-10">
//           <button
//             onClick={() => setVisible((prev) => prev + 8)}
//             className="btn btn-primary"
//           >
//             Load More
//           </button>
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import TileCard from "@/components/TileCard";
import { authClient } from "@/lib/auth-client";

import "swiper/css";

export default function AllTilesPage() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [visible, setVisible] = useState(8);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    fetch("http://localhost:5000/tiles")
      .then((res) => res.json())
      .then((data) => {
        setTiles(data);
        setLoading(false);
      });
  }, []);

  const filteredTiles = tiles
    .filter((t) => category === "all" || t.category === category)
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );

  const visibleTiles = filteredTiles.slice(0, visible);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
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
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
              className="w-full h-[420px] object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Premium Tiles
          </h1>

          <input
            type="text"
            placeholder="Search tiles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xl px-5 py-4 rounded-full bg-white text-black"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-end">
        <select
          className="p-2 border rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="ceramic">Ceramic</option>
          <option value="marble">Marble</option>
          <option value="porcelain">Porcelain</option>
          <option value="stone">Stone</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleTiles.map((tile) => (
          <TileCard
            key={tile._id || tile.id}
            tile={tile}
            session={session?.user}
          />
        ))}
      </div>

      {visible < filteredTiles.length && (
        <div className="text-center py-10">
          <button
            onClick={() => setVisible((prev) => prev + 8)}
            className="btn btn-primary"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}