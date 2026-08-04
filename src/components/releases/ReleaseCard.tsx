"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowUpRight, Music2, Clock3, Lock } from "lucide-react";
import type { Release } from "@/constants/releases";

interface ReleaseCardProps {
  release: Release;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function ReleaseCard({ release }: ReleaseCardProps) {
  const trackCount = Number(release.tracks);
  const trackLabel = Number.isFinite(trackCount)
    ? `${trackCount} ${trackCount === 1 ? "Track" : "Tracks"}`
    : `${release.tracks} Tracks`;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_8px_30px_rgba(78,42,132,0.08)] hover:shadow-[0_28px_60px_rgba(78,42,132,0.2)] transition-shadow duration-500"
    >
      {/* Accent hairline keyed to the release's own color */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-[3px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${release.accent}, transparent)`,
        }}
        aria-hidden
      />

      {/* Cover Art */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={release.cover}
          alt={release.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={release.loading ?? "lazy"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />

        {/* Cinematic gradient so the title reads over any artwork */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/5 opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

        {/* Top row: type + status tag */}
        <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full text-white shadow-sm backdrop-blur-md"
            style={{ backgroundColor: `${release.accent}D9` }}
          >
            {release.type}
          </span>
          {release.tag && (
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full bg-white/15 text-white backdrop-blur-md border border-white/25">
              {release.upcoming ? "Coming Soon" : release.tag}
            </span>
          )}
        </div>

        {/* Center play / lock control, revealed on hover */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="absolute h-16 w-16 rounded-full border border-white/50 opacity-0 scale-90 group-hover:scale-[1.6] group-hover:opacity-0 transition-all duration-700 ease-out"
            aria-hidden
          />
          {release.upcoming ? (
            <div className="relative z-10 flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white/90 text-[#2B154B] opacity-0 shadow-2xl transition-all duration-400 ease-out group-hover:scale-100 group-hover:opacity-100">
              <Lock className="w-5 h-5" />
            </div>
          ) : release.link ? (
            <a
              href={release.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Listen to ${release.title}`}
              className="relative z-10 flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white text-[#2B154B] opacity-0 shadow-2xl transition-all duration-400 ease-out hover:bg-[#B7A7D6] group-hover:scale-100 group-hover:opacity-100"
            >
              <Play className="w-5 h-5 ml-0.5 fill-[#2B154B]" />
            </a>
          ) : (
            <div className="relative z-10 flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white/90 text-[#2B154B] opacity-0 shadow-2xl transition-all duration-400 ease-out group-hover:scale-100 group-hover:opacity-100">
              <Play className="w-5 h-5 ml-0.5 fill-[#2B154B]" />
            </div>
          )}
        </div>

        {/* Title + artist overlaid on artwork, editorial style */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          <h3 className="font-[family-name:var(--font-recoleta)] text-lg sm:text-xl tracking-tight text-white line-clamp-1">
            {release.title}
          </h3>
          <p className="mt-0.5 text-xs sm:text-sm font-medium text-white/75 line-clamp-1">
            {release.artist}
          </p>
        </div>
      </div>

      {/* Meta footer */}
      <div className="flex flex-1 items-center justify-between gap-3 px-5 py-3.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-[#6E6485]">
          <span className="inline-flex items-center gap-1">
            <Music2 className="w-3 h-3 text-[#B7A7D6]" />
            {trackLabel}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="w-3 h-3 text-[#B7A7D6]" />
            {release.duration}
          </span>
        </div>

        {release.link && !release.upcoming && (
          <a
            href={release.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-1 text-xs font-semibold text-[#4E2A84] transition-colors hover:text-[#7B61FF]"
          >
            <span>Listen</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.article>
  );
}
