"use client";

import { motion } from "framer-motion";
import { ARTISTS } from "@/constants/artists";
import { ArtistCard } from "./ArtistCard";
import { staggerContainer, fadeIn } from "@/lib/animations";
import { Sparkles } from "lucide-react";

interface ArtistsSectionProps {
  limit?: number;
  showHeading?: boolean;
}

export function ArtistsSection({ limit, showHeading = true }: ArtistsSectionProps) {
  // Displays all 18 artists when no limit is provided
  const displayedArtists = limit ? ARTISTS.slice(0, limit) : ARTISTS;

  return (
    <section id="artists" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {showHeading && (
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B154B]/10 text-[#2B154B] text-xs font-bold uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#4B2E83]" />
            <span>Roster & Performers</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2B154B] tracking-tight">
            Featured Artists
          </h2>
          <p className="text-base sm:text-lg text-[#6E6485]">
            Discover all 18 performers available for booking through CRWU.
          </p>
        </div>
      )}

      {/* Grid: 4 columns desktop, 2 columns tablet, 1 column mobile */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {displayedArtists.map((artist) => (
          <motion.div key={artist.id} variants={fadeIn}>
            <ArtistCard artist={artist} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
