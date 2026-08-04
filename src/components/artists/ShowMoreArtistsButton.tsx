"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function ShowMoreArtistsButton() {
  return (
    <div className="flex justify-center pt-4">
      <Link href="/artists" className="relative inline-flex group">
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden inline-flex items-center gap-2.5 rounded-full bg-[#4E2A84] px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_12px_30px_rgba(78,42,132,0.22)] transition-shadow duration-400 group-hover:shadow-[0_16px_40px_rgba(123,97,255,0.28)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
          <span className="relative z-10">Show More Artists</span>
          <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-400 group-hover:translate-x-1" />
        </motion.span>
      </Link>
    </div>
  );
}
