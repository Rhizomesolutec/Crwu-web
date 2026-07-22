"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import type { Artist } from "@/constants/artists";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.id}`}>
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative h-full bg-white rounded-3xl p-4 border border-[#B7A7D6]/30 shadow-sm hover:shadow-xl hover:border-[#B7A7D6] transition-all flex flex-col justify-between overflow-hidden cursor-pointer"
      >
        {/* Top Image Container */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#2B154B]/5 mb-4">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B154B]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Availability Badge */}
          <div className="absolute top-3 left-3 bg-[#2B154B]/80 backdrop-blur-md border border-[#B7A7D6]/40 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Booking</span>
          </div>

          {/* Quick arrow indicator */}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#2B154B] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Content Info */}
        <div className="flex-1 flex flex-col justify-between space-y-2">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-xl font-extrabold text-[#2B154B] group-hover:text-[#4B2E83] transition-colors line-clamp-1">
                {artist.name}
              </h3>
            </div>

            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#4B2E83] bg-[#B7A7D6]/20 px-2.5 py-0.5 rounded-md mb-2 font-mono">
              {artist.genre}
            </span>

            <p className="text-xs text-[#6E6485] leading-relaxed line-clamp-2">
              {artist.description}
            </p>
          </div>

          {/* Action Footer inside card */}
          <div className="pt-3 border-t border-[#B7A7D6]/20 flex items-center justify-between text-xs font-bold text-[#2B154B] group-hover:text-[#4B2E83]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#4B2E83]" />
              <span>View Songs & Book</span>
            </span>
            <span className="text-[#B7A7D6] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
