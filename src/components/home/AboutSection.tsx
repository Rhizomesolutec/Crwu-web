"use client";

import { ShieldCheck, CalendarCheck, Zap } from "lucide-react";
import { useGsapReveal } from "@/lib/gsap";

export function AboutSection() {
  useGsapReveal(".gsap-reveal");

  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Artists",
      description: "Direct roster of authentic rap performers, beat makers, and underground legends with proven live track records."
    },
    {
      icon: CalendarCheck,
      title: "Professional Event Coordination",
      description: "End-to-end booking logistics, technical rider management, sound checks, and stage hospitality coordination."
    },
    {
      icon: Zap,
      title: "Fast Collaboration Requests",
      description: "Streamlined turnarounds for feature verses, studio production sessions, and fast contract execution."
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-[#2B154B] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        
        {/* Subtle decorative purple glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4B2E83] rounded-full blur-3xl opacity-50 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#B7A7D6]/20 text-[#B7A7D6] text-xs font-bold uppercase tracking-wider font-mono">
            Platform Excellence
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why CRWU?
          </h2>
          <p className="text-base sm:text-lg text-[#B7A7D6]/90 leading-relaxed">
            CRWU bridges the gap between event organizers and top-tier hip-hop talent with zero friction and guaranteed professionalism.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="gsap-reveal bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-[#B7A7D6]/20 hover:border-[#B7A7D6]/50 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#B7A7D6] text-[#2B154B] flex items-center justify-center shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-sm text-[#B7A7D6]/80 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
