"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useCartButton(tile, session) {
  const [isCartAdded, setIsCartAdded] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!session?.email || !tile) return;

      const res = await fetch(`/api/cart?email=${session.email}`);
      const data = await res.json();

      const exists = data?.some(
        (item) => item.tileId === (tile._id || tile.id)
      );

      setIsCartAdded(exists);
    };

    check();
  }, [tile, session]);

  const toggleCart = async () => {
    if (!session?.email) {
      toast.error("Login first");
      return;
    }

    const tileId = tile._id || tile.id;

    if (!isCartAdded) {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tileId,
          title: tile.title,
          image: tile.image,
          price: tile.price,
          category: tile.category,
          userEmail: session.email,
        }),
      });

      if (res.ok) {
        setIsCartAdded(true);
        toast.success("Added to cart ");
      }
    } else {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tileId,
          userEmail: session.email,
        }),
      });

      if (res.ok) {
        setIsCartAdded(false);
        toast.success("Removed from cart ");
      }
    }
  };

  return { isCartAdded, toggleCart };
}