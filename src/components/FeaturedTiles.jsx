"use client";

import { useEffect, useState } from "react";
import TileCard from "@/components/TileCard";

export default function FeaturedTiles() {
  const [tiles, setTiles] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetch("/db.json")
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
        <h2 className="text-4xl font-bold">Featured Tiles</h2>
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