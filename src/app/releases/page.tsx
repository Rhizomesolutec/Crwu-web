"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RELEASES } from "@/constants/releases";
import { ReleaseCard } from "@/components/releases/ReleaseCard";
import { Disc, Search } from "lucide-react";

export default function ReleasesPage() {
  const [filterType, setFilterType] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const types = ["ALL", "SINGLE", "EP", "ALBUM"];

  const filteredReleases = RELEASES.filter((release) => {
    const matchesSearch =
      release.title.toLowerCase().includes(search.toLowerCase()) ||
      release.artist.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "ALL" || release.type.toUpperCase() === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1F1F1F]">
      <Navbar />

      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B154B]/10 text-[#2B154B] text-xs font-bold uppercase tracking-wider font-mono">
            <Disc className="w-3.5 h-3.5 text-[#4B2E83]" />
            <span>Music Catalogue</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#2B154B] tracking-tight">
            Discography & Tracks
          </h1>
          <p className="text-base sm:text-lg text-[#6E6485]">
            Explore all singles, albums, and featured tracks released across the CRWU collective.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#B7A7D6]/30 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search title or artist..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F1ECF7] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1E1330] focus:outline-none focus:border-[#2B154B]"
            />
          </div>

          <div className="flex items-center gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                  filterType === type
                    ? "bg-[#2B154B] text-white shadow-sm"
                    : "bg-[#F1ECF7] text-[#6E6485] hover:text-[#2B154B]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReleases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
