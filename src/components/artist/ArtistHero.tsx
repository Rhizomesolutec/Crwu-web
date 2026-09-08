"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Music2 } from "lucide-react";
import type { Artist } from "@/types/content";

interface ArtistHeroProps {
  artist: Artist;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * One reusable, data-driven hero for every artist subdomain microsite.
 * Content and image always come from the `artist` prop (the record
 * resolved server-side for the current subdomain) — nothing here is
 * hardcoded per-artist. The full standardized biography (`fullDescription`)
 * is shown directly under the artist name; the same text is also rendered
 * in full in the About section below.
 */
export function ArtistHero({ artist }: ArtistHeroProps) {
  const bio = artist.fullDescription || artist.description;

  return (
    <section className="relative overflow-hidden">
      {/* Soft ambient background — subtle CRWU-purple glows only, no dark/neon. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-24 right-[-12%] h-[380px] w-[380px] rounded-full bg-[#7B61FF]/12 blur-[110px]" />
        <div className="absolute -bottom-28 left-[-12%] h-[320px] w-[320px] rounded-full bg-[#4E2A84]/10 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-14 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          {/* Artist image — large, integrated into the page, no visible card. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="order-1 md:order-2 md:col-span-6"
          >
            <div className="relative mx-auto max-w-sm md:max-w-none">
              {/* Subtle gradient glow behind the image for depth. */}
              <div className="absolute -inset-6 sm:-inset-8 rounded-[2.5rem] bg-gradient-to-tr from-[#7B61FF]/18 via-[#4E2A84]/10 to-transparent blur-2xl -z-10" />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-[0_30px_80px_rgba(78,42,132,0.18)]">
                <Image
                  src={artist.modalImage || artist.image}
                  alt={artist.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover"
                  style={{ objectPosition: artist.imageFocus || "center 28%" }}
                />
                {artist.bookingAvailable !== false && (
                  <span className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-1.5 bg-[#1F1F1F]/70 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Available for Booking
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Text content */}
          <div className="order-2 md:order-1 md:col-span-6 space-y-6 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
              className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#4E2A84]/70"
            >
              {artist.genre}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
              className="text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight font-[family-name:var(--font-recoleta)] text-[#1F1F1F]"
            >
              {artist.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
              className="text-base sm:text-lg text-[#6E6485] leading-relaxed max-w-lg mx-auto md:mx-0"
            >
              {bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.32 }}
              className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2"
            >
              <a
                href="#releases"
                className="inline-flex items-center gap-2 bg-[#4E2A84] hover:bg-[#3d2168] text-white font-semibold px-7 py-3.5 rounded-full text-sm sm:text-base shadow-[0_12px_30px_rgba(78,42,132,0.2)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Music2 className="w-4 h-4" />
                <span>Explore Music</span>
              </a>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 bg-white text-[#4E2A84] border border-[#4E2A84]/16 hover:bg-[#4E2A84]/8 font-semibold px-7 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Artist</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
