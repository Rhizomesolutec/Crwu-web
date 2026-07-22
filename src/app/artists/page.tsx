"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTISTS } from "@/constants/artists";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { BookingSelector } from "@/components/booking/BookingSelector";
import { Search, Sparkles } from "lucide-react";

export default function ArtistsDirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("ALL");

  const genres = ["ALL", ...Array.from(new Set(ARTISTS.map((a) => a.genre)))];

  const filteredArtists = ARTISTS.filter((artist) => {
    const matchesSearch =
      artist.name.toLowerCase().includes(search.toLowerCase()) ||
      artist.description.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === "ALL" || artist.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1E1330]">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B154B]/10 text-[#2B154B] text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#4B2E83]" />
            <span>CRWU Roster Directory</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#2B154B] tracking-tight">
            Performers & Artists
          </h1>
          <p className="text-base sm:text-lg text-[#6E6485]">
            Browse our full lineup of underground rap icons, EDM producers, trap vocalists, and stage show leaders.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#B7A7D6]/30 shadow-sm">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search artist by name or bio..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F5F2FB] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1E1330] focus:outline-none focus:border-[#2B154B]"
            />
          </div>

          {/* Genre Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {genres.slice(0, 5).map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-all flex-shrink-0 ${
                  selectedGenre === genre
                    ? "bg-[#2B154B] text-white shadow-sm"
                    : "bg-[#F5F2FB] text-[#6E6485] hover:text-[#2B154B]"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

        </div>

        {/* Artists Grid */}
        {filteredArtists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#B7A7D6]/30">
            <p className="text-lg font-bold text-[#2B154B]">No artists found matching your search.</p>
            <button
              onClick={() => { setSearch(""); setSelectedGenre("ALL"); }}
              className="mt-2 text-xs font-bold text-[#4B2E83] underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Unified Booking Section */}
        <BookingSelector />

      </main>

      <Footer />
    </div>
  );
}
