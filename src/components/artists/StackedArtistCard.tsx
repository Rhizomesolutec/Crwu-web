"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/types/content";

interface StackedArtistCardProps {
  artist: Artist;
  index: number;
  total: number;
  priority?: boolean;
}

export function StackedArtistCard({
  artist,
  index,
  total,
  priority = false,
}: StackedArtistCardProps) {
  const position = String(index + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <div className="stack-card absolute inset-0 flex items-center justify-center px-4 sm:px-6 will-change-transform">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="group relative w-full max-w-5xl overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] border border-white/70 bg-white/65 backdrop-blur-xl shadow-[0_40px_90px_-32px_rgba(78,42,132,0.4)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
          <div className="relative h-[32vh] min-h-[210px] md:h-[56vh] md:min-h-[380px] overflow-hidden">
            <Image
              src={artist.image}
              alt={artist.name}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F]/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/30" />

            <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-[#1F1F1F]/35 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/90 backdrop-blur-md">
              {position} / {count}
            </span>
          </div>

          <div className="flex flex-col justify-center gap-4 p-6 sm:p-9 md:p-11">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#4E2A84]/75">
              {artist.genre}
            </p>

            <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-[#1F1F1F] font-[family-name:var(--font-recoleta)]">
              {artist.name}
            </h3>

            <p className="text-sm sm:text-base leading-relaxed text-[#6E6485] line-clamp-3 md:line-clamp-4">
              {artist.description}
            </p>

            <div className="pt-2">
              <Link
                href={`/artists/${artist.id}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#4E2A84]/15 bg-white/70 px-5 py-3 text-sm font-semibold text-[#4E2A84] transition-all duration-500 hover:border-[#7B61FF]/40 hover:bg-[#4E2A84] hover:text-white"
              >
                <span>View Profile</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
