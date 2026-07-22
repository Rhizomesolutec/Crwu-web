"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import type { Release } from "@/constants/releases";

interface ReleaseCardProps {
  release: Release;
}

export function ReleaseCard({ release }: ReleaseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-white rounded-3xl p-4 border border-[#B7A7D6]/30 shadow-sm hover:shadow-xl hover:border-[#B7A7D6] transition-all flex flex-col justify-between overflow-hidden"
    >
      {/* Cover Image Container */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#2B154B]/10 mb-4">
        <Image
          src={release.cover}
          alt={release.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-[#2B154B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {release.link ? (
            <a
              href={release.link}
              target="_blank"
              rel="noreferrer"
              className="w-14 h-14 rounded-full bg-[#F5F2FB] text-[#2B154B] flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300 hover:bg-[#B7A7D6]"
              aria-label={`Listen to ${release.title}`}
            >
              <Play className="w-6 h-6 fill-[#2B154B] ml-0.5" />
            </a>
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#F5F2FB] text-[#2B154B] flex items-center justify-center shadow-2xl">
              <Play className="w-6 h-6 fill-[#2B154B] ml-0.5" />
            </div>
          )}
        </div>

        {/* Type Tag */}
        <div className="absolute top-3 left-3 bg-[#2B154B]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
          {release.type}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-[#2B154B] group-hover:text-[#4B2E83] transition-colors line-clamp-1">
            {release.title}
          </h3>
          <p className="text-sm font-medium text-[#6E6485] line-clamp-1">
            {release.artist}
          </p>
        </div>

        <div className="pt-2 border-t border-[#B7A7D6]/20 flex items-center justify-between text-xs text-[#6E6485]">
          <span>{release.date}</span>
          {release.link && (
            <a
              href={release.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#2B154B] hover:text-[#4B2E83]"
            >
              <span>Listen</span>
              <ExternalLink className="w-3 h-3 text-[#B7A7D6]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
