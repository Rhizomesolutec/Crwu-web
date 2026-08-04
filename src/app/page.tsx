import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { StackedArtistsSection } from "@/components/artists/StackedArtistsSection";
import { ReleasesSection } from "@/components/releases/ReleasesSection";
import { BookingSelector } from "@/components/booking/BookingSelector";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { getArtistsBySlugs } from "@/lib/data/artists";
import { getReleases } from "@/lib/data/releases";

export const metadata = {
  title: "CRWU | Music Artist Booking Platform",
  description:
    "Book raw rap talent, beat producers, and stage performers for concerts, festivals, and studio collaborations.",
};

export const dynamic = "force-dynamic";

const FEATURED_ARTIST_SLUGS = ["mhr", "lil-payyan", "joker390p"] as const;

export default async function HomePage() {
  const [artists, releases] = await Promise.all([
    getArtistsBySlugs([...FEATURED_ARTIST_SLUGS]),
    getReleases(6),
  ]);

  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1F1F1F] antialiased selection:bg-[#7B61FF]/25 selection:text-[#1F1F1F]">
      <Navbar />

      <main>
        <HeroSection />

        <StackedArtistsSection artists={artists} showMoreButton />

        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <BookingSelector />
        </section>

        <ReleasesSection limit={6} releases={releases} />

        <AboutSection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
