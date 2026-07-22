"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RELEASES } from "@/constants/releases";
import { ReleaseCard } from "./ReleaseCard";
import { ArrowRight, Disc } from "lucide-react";

interface ReleasesSectionProps {
  limit?: number;
  showHeading?: boolean;
}

export function ReleasesSection({ limit, showHeading = true }: ReleasesSectionProps) {
  const displayedReleases = limit ? RELEASES.slice(0, limit) : RELEASES;

  return (
    <section id="releases" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {showHeading && (
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B154B]/10 text-[#2B154B] text-xs font-bold uppercase tracking-wider font-mono">
              <Disc className="w-3.5 h-3.5 text-[#4B2E83]" />
              <span>Music & Discography</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2B154B] tracking-tight">
              Latest Releases
            </h2>
            <p className="text-base text-[#6E6485]">
              Explore original tracks, singles, and albums produced and performed by CRWU roster artists.
            </p>
          </div>

          <Link
            href="/releases"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2B154B] hover:text-[#4B2E83] bg-[#B7A7D6]/20 hover:bg-[#B7A7D6]/40 px-5 py-2.5 rounded-full transition-all"
          >
            <span>View All Tracks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Grid on Desktop / Horizontal Scroll on Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none"
      >
        {displayedReleases.map((release) => (
          <div
            key={release.id}
            className="min-w-[280px] sm:min-w-[320px] md:min-w-0 snap-center flex-shrink-0 md:flex-shrink"
          >
            <ReleaseCard release={release} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
