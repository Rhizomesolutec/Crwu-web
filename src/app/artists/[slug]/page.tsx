import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ARTISTS } from "@/constants/artists";
import { RELEASES } from "@/constants/releases";
import { BookingSelector } from "@/components/booking/BookingSelector";
import { ReleaseCard } from "@/components/releases/ReleaseCard";
import { Music, ArrowLeft, Calendar, Disc, CheckCircle2 } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/common/Icons";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTISTS.map((artist) => ({
    slug: artist.id
  }));
}

export async function generateMetadata({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = ARTISTS.find(
    (a) => a.id.toLowerCase() === slug.toLowerCase() || a.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  if (!artist) return { title: "Artist Not Found | CRWU" };

  return {
    title: `${artist.name} - Book Artist | CRWU`,
    description: artist.description
  };
}

export default async function ArtistDetailsPage({ params }: ArtistPageProps) {
  const { slug } = await params;

  const artist = ARTISTS.find(
    (a) => a.id.toLowerCase() === slug.toLowerCase() || a.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
  );

  if (!artist) {
    notFound();
  }

  // Filter releases belonging to this artist
  const artistReleases = RELEASES.filter((r) =>
    r.artist.toLowerCase().includes(artist.name.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1E1330]">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        
        {/* Back Link */}
        <div>
          <Link
            href="/#artists"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6E6485] hover:text-[#2B154B] uppercase tracking-wider font-mono bg-white px-4 py-2 rounded-full border border-[#B7A7D6]/30 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Artists</span>
          </Link>
        </div>

        {/* Hero Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B7A7D6]/40 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Artist Image */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#2B154B]/5 border border-[#B7A7D6]/30 shadow-md">
            <Image
              src={artist.modalImage || artist.image}
              alt={artist.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#2B154B]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Booking</span>
            </div>
          </div>

          {/* Artist Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#4B2E83] bg-[#B7A7D6]/20 px-3 py-1 rounded-md font-mono">
                {artist.genre}
              </span>
              <h1 className="text-4xl sm:text-6xl font-black text-[#2B154B] tracking-tight">
                {artist.name}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#6E6485] leading-relaxed">
              {artist.description}
            </p>

            {/* Social Links */}
            {artist.socials && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="text-xs font-bold text-[#2B154B] uppercase tracking-wider font-mono mr-2">
                  Official Channels:
                </span>
                {artist.socials.instagram && (
                  <a
                    href={artist.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#F5F2FB] hover:bg-[#B7A7D6]/30 text-[#2B154B] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#B7A7D6]/40 transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#4B2E83]" />
                    <span>Instagram</span>
                  </a>
                )}
                {artist.socials.spotify && (
                  <a
                    href={artist.socials.spotify}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#F5F2FB] hover:bg-[#B7A7D6]/30 text-[#2B154B] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#B7A7D6]/40 transition-colors"
                  >
                    <Music className="w-4 h-4 text-emerald-600" />
                    <span>Spotify</span>
                  </a>
                )}
                {artist.socials.youtube && (
                  <a
                    href={artist.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#F5F2FB] hover:bg-[#B7A7D6]/30 text-[#2B154B] font-bold text-xs px-3.5 py-2 rounded-xl border border-[#B7A7D6]/40 transition-colors"
                  >
                    <YoutubeIcon className="w-4 h-4 text-red-600" />
                    <span>YouTube</span>
                  </a>
                )}
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-4 border-t border-[#B7A7D6]/30">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-[#2B154B] hover:bg-[#4B2E83] text-white font-bold px-8 py-4 rounded-2xl text-base shadow-lg shadow-[#2B154B]/20 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-[#B7A7D6]" />
                <span>Book {artist.name}</span>
              </a>
            </div>

          </div>

        </div>

        {/* About Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#B7A7D6]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-[#4B2E83] font-bold text-xs uppercase font-mono tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Biography & Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B154B]">
            About {artist.name}
          </h2>
          <p className="text-base text-[#6E6485] leading-relaxed whitespace-pre-line">
            {artist.fullDescription || artist.description}
          </p>
        </div>

        {/* Released Songs Section */}
        {artistReleases.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#4B2E83] font-bold text-xs uppercase font-mono tracking-wider">
                <Disc className="w-4 h-4" />
                <span>Discography</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2B154B]">
                Releases by {artist.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {artistReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </div>
        )}

        {/* Booking Section */}
        <BookingSelector artistName={artist.name} />

      </main>

      <Footer />
    </div>
  );
}
