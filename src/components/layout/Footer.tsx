import Link from "next/link";
import Image from "next/image";
import { Music, Disc, ArrowUpRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/common/Icons";

export function Footer() {
  return (
    <footer className="bg-[#1A0E2E] text-[#F5F1FB] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#B7A7D6]/30">
                <Image
                  src="/crwu logo.jpeg"
                  alt="CRWU Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-2xl font-black tracking-widest text-[#B7A7D6] font-mono">
                CRWU
              </span>
            </div>
            <p className="text-sm text-[#B7A7D6]/80 leading-relaxed">
              The premier platform connecting concert organizers with raw rap talent, beat producers, and explosive stage performers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#4B2E83] flex items-center justify-center text-[#B7A7D6] hover:bg-[#B7A7D6] hover:text-[#2B154B] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#4B2E83] flex items-center justify-center text-[#B7A7D6] hover:bg-[#B7A7D6] hover:text-[#2B154B] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#4B2E83] flex items-center justify-center text-[#B7A7D6] hover:bg-[#B7A7D6] hover:text-[#2B154B] transition-colors"
                aria-label="Spotify"
              >
                <Music className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B7A7D6] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-[#B7A7D6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/artists" className="hover:text-[#B7A7D6] transition-colors">
                  Featured Artists
                </Link>
              </li>
              <li>
                <Link href="/releases" className="hover:text-[#B7A7D6] transition-colors">
                  Latest Releases
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#B7A7D6] transition-colors">
                  Why CRWU
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#B7A7D6] transition-colors font-bold text-[#B7A7D6]">
                  Admin & Artist Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Booking & Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B7A7D6] mb-4">
              Booking Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/artists#booking" className="hover:text-[#B7A7D6] transition-colors flex items-center gap-1">
                  <span>Live Concerts</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B7A7D6]" />
                </Link>
              </li>
              <li>
                <Link href="/artists#booking" className="hover:text-[#B7A7D6] transition-colors flex items-center gap-1">
                  <span>Stage Shows & Festivals</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B7A7D6]" />
                </Link>
              </li>
              <li>
                <Link href="/artists#booking" className="hover:text-[#B7A7D6] transition-colors flex items-center gap-1">
                  <span>Studio & Feature Collabs</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B7A7D6]" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B7A7D6] transition-colors">
                  Custom Event Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B7A7D6] mb-4">
              Direct Booking Contact
            </h4>
            <div className="space-y-3 text-sm text-[#B7A7D6]/90">
              <p>Email: <a href="mailto:booking@crwu.com" className="text-white hover:underline">booking@crwu.com</a></p>
              <p>Phone: <a href="tel:+919876543210" className="text-white hover:underline">+91 98765 43210</a></p>
              <p className="text-xs text-[#B7A7D6]/60 pt-2">
                Available 24/7 for event organizers and festival managers across India & abroad.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#4B2E83]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B7A7D6]/70">
          <p>© 2026 CRWU. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Booking</span>
            <span>Artist Submissions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
