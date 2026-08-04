"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Only the home page has a dark hero image behind the navbar at the top,
  // so every other page always shows the hero-matching navbar background.
  const isHome = pathname === "/";

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 20);
    });
  }, [scrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Artists", href: "/#artists" },
    { name: "Releases", href: "/releases" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
    { name: "Admin Portal", href: "/admin" }
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#1A0E2E]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3"
        : isHome
          ? "bg-transparent py-5"
          : "bg-[#1A0E2E] border-b border-white/10 shadow-lg shadow-black/20 py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200 border border-[#B7A7D6]/40">
              <Image
                src="/crwu logo.jpeg"
                alt="CRWU Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-2xl font-extrabold tracking-wider text-white font-mono">
              CRWU
            </span>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 bg-white/10 px-6 py-2 rounded-full border border-[#B7A7D6]/30 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-white hover:text-[#B7A7D6] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#B7A7D6] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right: CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/artists#booking"
              className="inline-flex items-center gap-2 bg-[#4B2E83] hover:bg-[#7B61FF] text-white font-medium px-5 py-2.5 rounded-full text-sm shadow-md shadow-black/20 hover:shadow-lg hover:shadow-[#7B61FF]/25 transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#B7A7D6]" />
              <span>Book Artist</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-[#1A0E2E]/97 backdrop-blur-md border-b border-white/10 px-4 pt-3 pb-6 shadow-xl"
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-white hover:text-[#B7A7D6] py-2 px-3 rounded-lg hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/artists#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-[#4B2E83] text-white font-semibold py-3 px-4 rounded-xl text-center shadow-md mt-2"
            >
              <Calendar className="w-4 h-4 text-[#B7A7D6]" />
              Book Artist
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
