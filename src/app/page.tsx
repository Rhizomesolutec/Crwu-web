import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { ArtistsSection } from "@/components/artists/ArtistsSection";
import { ReleasesSection } from "@/components/releases/ReleasesSection";
import { BookingSelector } from "@/components/booking/BookingSelector";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "CRWU | Music Artist Booking Platform",
  description: "Book raw rap talent, beat producers, and stage performers for concerts, festivals, and studio collaborations."
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1E1330] font-sans antialiased selection:bg-[#B7A7D6] selection:text-[#2B154B]">
      <Navbar />

      <main>
        <HeroSection />

        {/* Shows ALL 18 artists directly on the home page */}
        <ArtistsSection />

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <BookingSelector />
        </section>

        <ReleasesSection limit={6} />

        <AboutSection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
