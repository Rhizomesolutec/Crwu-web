"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { BookingSelector } from "@/components/booking/BookingSelector";
import { fadeIn, staggerContainer } from "@/lib/animations";
import type { Artist } from "@/types/content";
import { Search } from "lucide-react";

interface ArtistsDirectoryProps {
  artists: Artist[];
}

export function ArtistsDirectory({ artists }: ArtistsDirectoryProps) {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");

  const genres = useMemo(
    () => ["ALL", ...Array.from(new Set(artists.map((a) => a.genre)))],
    [artists]
  );

  const filteredArtists = useMemo(() => {
    return [...artists]
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
      .filter((artist) => {
        const matchesSearch =
          artist.name.toLowerCase().includes(search.toLowerCase()) ||
          artist.description.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = selectedGenre === "ALL" || artist.genre === selectedGenre;
        return matchesSearch && matchesGenre;
      });
  }, [artists, search, selectedGenre]);

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="max-w-2xl space-y-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#4E2A84]/70 font-medium">
          Full roster
        </p>
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#1F1F1F] font-[family-name:var(--font-recoleta)] leading-[1.05]">
          Performers & Artists
        </h1>
        <p className="text-base sm:text-lg text-[#6E6485] leading-relaxed">
          Browse our full lineup of underground rap icons, EDM producers, trap vocalists, and stage show leaders.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#4E2A84]/10 shadow-[0_8px_30px_rgba(78,42,132,0.05)]">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search artist by name or bio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF8FC] border border-[#4E2A84]/12 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1F1F1F] focus:outline-none focus:border-[#4E2A84]/40"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {genres.slice(0, 5).map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex-shrink-0 ${
                selectedGenre === genre
                  ? "bg-[#4E2A84] text-white"
                  : "bg-[#FAF8FC] text-[#6E6485] hover:text-[#4E2A84]"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {filteredArtists.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredArtists.map((artist, index) => (
            <motion.div key={artist.id} variants={fadeIn}>
              <ArtistCard artist={artist} priority={index < 3} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-16 bg-white/80 rounded-3xl border border-[#4E2A84]/10">
          <p className="text-lg font-semibold text-[#1F1F1F]">No artists found matching your search.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedGenre("ALL");
            }}
            className="mt-2 text-xs font-semibold text-[#4E2A84] underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      <BookingSelector />
    </main>
  );
}
