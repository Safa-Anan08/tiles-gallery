// "use client";

// import Link from "next/link";
// import { FaHeart, FaEye, FaShoppingCart } from "react-icons/fa";
// import { useWishlist } from "@/wishlistButton/useWishlist";
// import { useCartButton } from "@/cartButton/useCartButton";

// export default function TileCard({ tile, session }) {
//   const { isWishlisted, toggleWishlist } = useWishlist(tile, session);
//   const { isCartAdded, toggleCart } = useCartButton(tile, session);

//   return (
//     <div className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
//       <img
//         src={tile.image}
//         className="h-52 w-full object-cover"
//       />

//       <div className="p-4">
//         <h2 className="font-semibold text-lg">
//           {tile.title}
//         </h2>

//         <p className="text-sm text-gray-500 line-clamp-2">
//           {tile.description}
//         </p>

//         <div className="flex justify-between mt-3">
//           <span className="font-bold text-green-600">
//             ${tile.price}
//           </span>
//           <span className="text-xs bg-gray-100 px-2 py-1 rounded">
//             {tile.category}
//           </span>
//         </div>

//         {/* Wishlist */}
//         <button
//           onClick={toggleWishlist}
//           className={`w-full mt-4 py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-red-500 transition
//           ${
//             isWishlisted
//               ? "bg-gray-700 text-white"
//               : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
//           }`}
//         >
//           <FaHeart />
//           {isWishlisted ? "Remove Wishlist" : "Wishlist"}
//         </button>

//         {/* Cart */}
//         <button
//           onClick={toggleCart}
//           className={`w-full mt-2 py-2 rounded-xl flex justify-center items-center gap-2 hover:bg-green-600  transition
//           ${
//             isCartAdded
//               ? "bg-gray-700 text-white"
//               : "bg-gradient-to-r from-blue-500 to-gray-400 text-white"
//           }`}
//         >
//           <FaShoppingCart />
//           {isCartAdded ? "Remove Cart" : "Add Cart"}
//         </button>

//         {/* Details */}
//         <Link
//           href={`/tile/${tile._id || tile.id}`}
//           className="block text-center mt-2  bg-blue-300 text-gray-800 py-2 rounded-xl hover:bg-gray-100 transition py-2 rounded-xl"
//         >
//           <FaEye className="inline mr-2" />
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "@/wishlistButton/useWishlist";
import { useCartButton } from "@/cartButton/useCartButton";

export default function TileCard({ tile, session }) {
  const { isWishlisted, toggleWishlist } = useWishlist(tile, session);
  const { isCartAdded, toggleCart } = useCartButton(tile, session);

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
          <span className="font-bold text-green-600">${tile.price}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {tile.category}
          </span>
        </div>

        <Link
          href={`/tile/${tile.id}`}
          className="block text-center mt-2 bg-blue-300 text-gray-800 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <FaEye className="inline mr-1" />
          View Details
        </Link>

        <button
          onClick={toggleWishlist}
          className={`w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl font-medium hover:bg-red-500 transition
          ${
            isWishlisted
              ? "bg-gray-500 text-white"
              : "bg-gradient-to-r from-red-400 to-pink-400 text-white"
          }`}
        >
          <FaHeart />
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>

        <button
          onClick={toggleCart}
          className={`w-full mt-4 flex items-center justify-center gap-2 py-2 rounded-xl font-medium hover:bg-green-600 transition
          ${
            isCartAdded
              ? "bg-gray-500 text-white"
              : "bg-gradient-to-r from-blue-500 to-gray-300 text-white"
          }`}
        >
          <FaShoppingCart />
          {isCartAdded ? "Remove from Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}