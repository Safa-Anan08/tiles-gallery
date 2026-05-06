"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { FaShoppingCart } from "react-icons/fa";
import Loader from "@/components/Loader";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      const session = await authClient.getSession();

      if (!session?.data?.user?.email) {
        toast.error("Please login first");
        return;
      }

      const res = await fetch(
        `/api/cart?email=${session.data.user.email}`
      );

      const data = await res.json();
      setCart(data);
      setLoading(false);
    };

    loadCart();
  }, []);

const handleRemove = async (tileId, userEmail) => {
  const res = await fetch("/api/cart", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tileId, userEmail }),
  });

  if (res.ok) {
    setCart((prev) =>
      prev.filter((item) => item.tileId !== tileId)
    );

    window.dispatchEvent(new Event("cart-updated"));

    toast.success("Removed from cart");
  } else {
    toast.error("Failed to remove");
  }
};
 if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-base-200 p-6 md:p-10">

      <h1 className=" flex gap-4 text-3xl font-bold mb-8 text-cyan-700">
        My Cart <FaShoppingCart/>
      </h1>

      {cart.length === 0 ? (
        <p className="opacity-60">Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition"
            >

              <img
                src={item.image}
                className="h-52 w-full object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold text-lg">
                  {item.title}
                </h2>

                <p className="text-sm opacity-70">
                  {item.category}
                </p>

                <div className="flex justify-between mt-3">
                  <span className="font-bold">
                    ${item.price}
                  </span>

                  <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">
                    Qty: {item.quantity || 1}
                  </span>
                </div>

                <button
                  onClick={() =>
                    handleRemove(item.tileId, item.userEmail)
                  }
                  className="mt-4 w-full py-2 border border-red-500 text-red-500 rounded-xl 
                  hover:bg-red-500 hover:text-white transition"
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}