"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useWishlist(tile, session) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!session?.email || !tile) return;

      const res = await fetch(`/api/wishlist?email=${session.email}`);
      const data = await res.json();

      const exists = data?.some(
        (item) => item.tileId === (tile._id || tile.id)
      );

      setIsWishlisted(exists);
    };

    check();
  }, [tile, session]);

  const toggleWishlist = async () => {
    if (!session?.email) {
      toast.error("Login first");
      return;
    }

    const tileId = tile._id || tile.id;

    if (!isWishlisted) {
      const res = await fetch("/api/wishlist", {
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
        setIsWishlisted(true);
        toast.success("Added to wishlist ");
      }
    } else {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tileId,
          userEmail: session.email,
        }),
      });

      if (res.ok) {
        setIsWishlisted(false);
        toast.success("Removed from wishlist ");
      }
    }
  };

  return { isWishlisted, toggleWishlist };
}