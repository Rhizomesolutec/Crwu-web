"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music2, Mic2, Sparkles, CheckCircle2, Clock, DollarSign, PhoneCall, ArrowRight } from "lucide-react";
import { BookingForm } from "./BookingForm";

export type BookingType = "Concert" | "Stage Show" | "Collaboration";

interface BookingDetail {
  id: BookingType;
  title: string;
  subtitle: string;
  icon: typeof Music2;
  duration: string;
  startingPrice: string;
  contactMethod: string;
  included: string[];
}

const BOOKING_TYPES: BookingDetail[] = [
  {
    id: "Concert",
    title: "Concert Booking",
    subtitle: "Headline or mainstage concert set for music festivals and club tours.",
    icon: Mic2,
    duration: "60 - 90 Minutes Full Live Performance",
    startingPrice: "Starting from ₹75,000",
    contactMethod: "Direct Agent Call & Contract Agreement",
    included: [
      "Full live band or DJ + vocalists performance",
      "Custom setlist curation",
      "Dedicated sound check & sound engineer",
      "Promotional shoutouts on artist social media",
      "High-energy stage presence & crowd interaction"
    ]
  },
  {
    id: "Stage Show",
    title: "Stage Show",
    subtitle: "High-octane live stage performance for college fests, corporate galas & cultural events.",
    icon: Sparkles,
    duration: "45 - 60 Minutes High-Energy Act",
    startingPrice: "Starting from ₹50,000",
    contactMethod: "Fast Track WhatsApp & Direct Booking",
    included: [
      "Dynamic rap & beat showcase",
      "Backing tracks and live beat maker integration",
      "Meet & greet with VIP attendees",
      "Event banner feature rights",
      "Professional stage choreography"
    ]
  },
  {
    id: "Collaboration",
    title: "Collaboration",
    subtitle: "Studio feature, verse recording, beat production, or joint track release.",
    icon: Music2,
    duration: "Project-based (Studio Session / Track Feature)",
    startingPrice: "Starting from ₹35,000",
    contactMethod: "Direct Studio Email & Track Demo Review",
    included: [
      "Original verse or beat production",
      "High-quality studio stems delivery",
      "Co-crediting on streaming platforms",
      "Royalty structure & split sheet agreement",
      "Music video appearance option"
    ]
  }
];

interface BookingSelectorProps {
  artistName?: string;
}

export function BookingSelector({ artistName }: BookingSelectorProps) {
  const [selectedType, setSelectedType] = useState<BookingType>("Concert");

  const currentDetail = BOOKING_TYPES.find((b) => b.id === selectedType)!;

  return (
    <div id="booking" className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B7A7D6]/40 shadow-xl space-y-10">
      
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#2B154B]/10 text-[#2B154B] text-xs font-bold uppercase tracking-wider font-mono">
          Unified Booking System
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[#2B154B]">
          {artistName ? `Book ${artistName}` : "Book CRWU Performers"}
        </h3>
        <p className="text-sm sm:text-base text-[#6E6485]">
          Select the performance or collaboration type below to view details and send a formal booking request.
        </p>
      </div>

      {/* Segmented Tab Control */}
      <div className="flex p-1.5 bg-[#F5F2FB] rounded-2xl border border-[#B7A7D6]/30 max-w-xl mx-auto">
        {BOOKING_TYPES.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedType(item.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isSelected
                  ? "text-white shadow-md"
                  : "text-[#6E6485] hover:text-[#2B154B]"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="bookingTabBg"
                  className="absolute inset-0 bg-[#2B154B] rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-4 h-4" />
                <span>{item.id}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Detail Card + Booking Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Dynamic Detail Panel */}
        <div className="lg:col-span-5 bg-[#F5F2FB] rounded-2xl p-6 border border-[#B7A7D6]/30 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-2 text-[#4B2E83] font-bold text-xs uppercase font-mono tracking-wider mb-1">
                  <currentDetail.icon className="w-4 h-4" />
                  <span>Selected Package</span>
                </div>
                <h4 className="text-xl font-extrabold text-[#2B154B]">{currentDetail.title}</h4>
                <p className="text-xs text-[#6E6485] mt-1">{currentDetail.subtitle}</p>
              </div>

              {/* Price & Duration Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#B7A7D6]/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2B154B]/10 flex items-center justify-center text-[#2B154B]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#6E6485] font-mono">Performance Duration</p>
                    <p className="text-xs font-bold text-[#2B154B]">{currentDetail.duration}</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#B7A7D6]/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2B154B]/10 flex items-center justify-center text-[#2B154B]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#6E6485] font-mono">Pricing Estimate</p>
                    <p className="text-xs font-bold text-[#2B154B]">{currentDetail.startingPrice}</p>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#B7A7D6]/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2B154B]/10 flex items-center justify-center text-[#2B154B]">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#6E6485] font-mono">Contact & Processing</p>
                    <p className="text-xs font-bold text-[#2B154B]">{currentDetail.contactMethod}</p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-[#2B154B] uppercase tracking-wider font-mono">What is included:</p>
                <ul className="space-y-2">
                  {currentDetail.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#1E1330]">
                      <CheckCircle2 className="w-4 h-4 text-[#4B2E83] flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Booking Form Panel */}
        <div className="lg:col-span-7">
          <BookingForm bookingType={selectedType} artistName={artistName} />
        </div>

      </div>

    </div>
  );
}
