"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Music, CheckCircle2 } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/common/Icons";
import type { Artist } from "@/constants/artists";

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
  onBook: (artistName: string) => void;
}

export function ArtistModal({ artist, onClose, onBook }: ArtistModalProps) {
  if (!artist) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1E1330]/70 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 border border-[#B7A7D6]/40 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#F5F2FB] hover:bg-[#B7A7D6]/20 text-[#2B154B] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Image */}
            <div className="sm:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#2B154B]/5 border border-[#B7A7D6]/30 shadow-md">
              <Image
                src={artist.modalImage || artist.image}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 40vw"
              />
              <div className="absolute top-3 left-3 bg-[#2B154B]/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Booking</span>
              </div>
            </div>

            {/* Info */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#4B2E83] bg-[#B7A7D6]/20 px-3 py-0.5 rounded-md font-mono mb-2">
                  {artist.genre}
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#2B154B]">
                  {artist.name}
                </h3>
              </div>

              <p className="text-sm text-[#6E6485] leading-relaxed">
                {artist.fullDescription || artist.description}
              </p>

              {/* Social Channels */}
              {artist.socials && (
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {artist.socials.instagram && (
                    <a
                      href={artist.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#F5F2FB] hover:bg-[#B7A7D6]/30 text-[#2B154B] font-bold text-xs px-3 py-1.5 rounded-xl border border-[#B7A7D6]/40 transition-colors"
                    >
                      <InstagramIcon className="w-3.5 h-3.5 text-[#4B2E83]" />
                      <span>Instagram</span>
                    </a>
                  )}
                  {artist.socials.spotify && (
                    <a
                      href={artist.socials.spotify}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#F5F2FB] hover:bg-[#B7A7D6]/30 text-[#2B154B] font-bold text-xs px-3 py-1.5 rounded-xl border border-[#B7A7D6]/40 transition-colors"
                    >
                      <Music className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Spotify</span>
                    </a>
                  )}
                  {artist.socials.youtube && (
                    <a
                      href={artist.socials.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#F5F2FB] hover:bg-[#B7A7D6]/30 text-[#2B154B] font-bold text-xs px-3 py-1.5 rounded-xl border border-[#B7A7D6]/40 transition-colors"
                    >
                      <YoutubeIcon className="w-3.5 h-3.5 text-red-600" />
                      <span>YouTube</span>
                    </a>
                  )}
                </div>
              )}

              {/* Action */}
              <div className="pt-4 border-t border-[#B7A7D6]/30">
                <button
                  onClick={() => {
                    onClose();
                    onBook(artist.name);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2B154B] hover:bg-[#4B2E83] text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#B7A7D6]" />
                  <span>Book {artist.name} Now</span>
                </button>
              </div>

            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
