"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Volume2, Play } from "lucide-react";
import { useGsapFloating } from "@/lib/gsap";

export function HeroSection() {
  // GSAP floating effect on elements with .gsap-float
  useGsapFloating(".gsap-float");

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden bg-[#1A0E2E]">
      {/* Stage show background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero_stage_background.png"
          alt="CRWU live stage concert background"
          fill
          priority
          className="object-cover"
        />
        {/* Readability overlays: consistent dark wash, fading into page background only at the very bottom */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E2E]/88 via-[#241442]/75 to-[#1A0E2E]/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E2E]/35 via-transparent to-[#1A0E2E]/92" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#1A0E2E]" />
      </div>

      {/* Background ambient purple glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#B7A7D6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#4B2E83]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column (Content) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-[#B7A7D6]/40 px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-[#B7A7D6]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase font-mono">
              RAP • BEATS • LIVE PERFORMANCE
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
            Book the Next Voice of the Stage
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-[#D8CFEA] font-normal leading-relaxed max-w-2xl">
            CRWU connects event organizers with talented rap artists, beat makers, and performers for concerts, stage shows, and creative collaborations.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#artists"
              className="inline-flex items-center gap-3 bg-[#2B154B] hover:bg-[#4B2E83] text-white font-semibold px-8 py-4 rounded-2xl text-base shadow-lg shadow-[#2B154B]/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Artists</span>
              <ArrowRight className="w-5 h-5 text-[#B7A7D6]" />
            </a>

            <a
              href="#releases"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-[#B7A7D6]/50 font-semibold px-8 py-4 rounded-2xl text-base shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Watch Releases</span>
            </a>
          </div>

          {/* Micro Stats / Highlights */}
          <div className="pt-8 border-t border-white/20 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">18+</p>
              <p className="text-xs text-[#D8CFEA] font-medium">Roster Artists</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">50+</p>
              <p className="text-xs text-[#D8CFEA] font-medium">Stage Shows</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">100%</p>
              <p className="text-xs text-[#D8CFEA] font-medium">Verified Roster</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column (Concert Image Card with Audio Waveform) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-square bg-[#2B154B] rounded-3xl p-3 border border-[#B7A7D6]/40 shadow-2xl overflow-hidden group flex flex-col justify-between">
            
            {/* Background Concert Image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <Image
                src="/hero_concert.png"
                alt="CRWU Live Concert Stage"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B154B] via-[#2B154B]/30 to-transparent" />
            </div>

            {/* Top Bar of Card */}
            <div className="relative z-10 flex items-center justify-between p-3">
              <div className="flex items-center gap-2 bg-[#2B154B]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#B7A7D6]/40">
                <Volume2 className="w-4 h-4 text-[#B7A7D6] animate-pulse" />
                <span className="text-xs font-semibold text-white">Live Concert Stage</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#B7A7D6] bg-[#2B154B]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#B7A7D6]/30">
                LIVE STAGE
              </span>
            </div>

            {/* Center Floating Badge */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 gsap-float">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-lg">
                <Image
                  src="/crwu logo.jpeg"
                  alt="CRWU Logo"
                  width={36}
                  height={36}
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-wide">
                CRWU STAGE EXPERIENCE
              </h3>
              <p className="text-xs text-[#B7A7D6] font-medium mt-1">
                Concerts • Festivals • Direct Artist Booking
              </p>
            </div>

            {/* Audio Waveform & Floating Beat Bars */}
            <div className="relative z-10 space-y-2 p-3 bg-[#2B154B]/80 backdrop-blur-md rounded-2xl border border-[#B7A7D6]/30">
              <div className="flex items-end justify-between gap-1.5 h-8 px-1">
                {[40, 75, 30, 90, 60, 100, 45, 80, 65, 35, 85, 50, 95, 40, 70, 85, 30, 60, 90, 40].map((h, i) => (
                  <div
                    key={i}
                    className="gsap-float flex-1 bg-gradient-to-t from-[#4B2E83] to-[#B7A7D6] rounded-full"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#B7A7D6] font-mono px-1">
                <span>02:45 / Live Sync</span>
                <span className="text-emerald-400 font-bold">● Booking Active</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
