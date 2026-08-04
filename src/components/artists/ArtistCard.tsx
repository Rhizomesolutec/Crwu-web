"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/types/content";

interface ArtistCardProps {
  artist: Artist;
  priority?: boolean;
}

export function ArtistCard({ artist, priority = false }: ArtistCardProps) {
  return (
    <Link href={`/artists/${artist.id}`} className="block h-full group">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full overflow-hidden rounded-[1.75rem] bg-white/70 backdrop-blur-md border border-[#4E2A84]/10 shadow-[0_8px_30px_rgba(78,42,132,0.06)] hover:shadow-[0_20px_50px_rgba(78,42,132,0.14)] hover:border-[#7B61FF]/35 transition-[box-shadow,border-color] duration-500"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/80 via-[#1F1F1F]/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 font-medium mb-1.5">
              {artist.genre}
            </p>
            <h3 className="text-2xl sm:text-[1.65rem] tracking-tight text-white font-[family-name:var(--font-recoleta)]">
              {artist.name}
            </h3>
            <p className="mt-2 text-sm text-white/75 line-clamp-2 leading-relaxed max-w-[92%]">
              {artist.description}
            </p>

            <div className="mt-4 flex items-center justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <span className="text-xs font-medium tracking-wide text-white/90">
                View profile
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 border border-white/25 text-white backdrop-blur-md">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
