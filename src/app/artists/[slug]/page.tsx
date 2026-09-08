import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookingSelector } from "@/components/booking/BookingSelector";
import { ReleaseCard } from "@/components/releases/ReleaseCard";
import { getArtistBySlug, getArtistSlugs } from "@/lib/data/artists";
import { getReleasesByArtistName } from "@/lib/data/releases";
import { getArtistUrl } from "@/lib/domain";
import { Music, ArrowLeft, Calendar, Disc, CheckCircle2, Globe } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/common/Icons";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const slugs = await getArtistSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) return { title: "Artist Not Found | CRWU" };

  return {
    title: `${artist.name} - Book Artist | CRWU`,
    description: artist.description,
  };
}

export default async function ArtistDetailsPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);

  if (!artist) {
    notFound();
  }

  const artistReleases = await getReleasesByArtistName(artist.name);

  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1F1F1F]">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div>
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#6E6485] hover:text-[#4E2A84] uppercase tracking-wider bg-white/80 px-4 py-2 rounded-full shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Artists</span>
          </Link>
        </div>

        {/* Artist Hero */}
        <section className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 sm:p-10 shadow-[0_16px_40px_rgba(78,42,132,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-[#4E2A84]/5">
            <Image
              src={artist.modalImage || artist.image}
              alt={artist.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            {artist.bookingAvailable !== false && (
              <div className="absolute top-4 left-4 bg-[#1F1F1F]/70 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Available for Booking</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E2A84] bg-[#4E2A84]/8 px-3 py-1 rounded-md">
                {artist.genre}
              </span>
              <h1 className="text-4xl sm:text-6xl font-semibold text-[#1F1F1F] tracking-tight font-[family-name:var(--font-recoleta)]">
                {artist.name}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#6E6485] leading-relaxed">
              {artist.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-[#4E2A84] hover:bg-[#3d2168] text-white font-semibold px-8 py-4 rounded-2xl text-base shadow-[0_12px_30px_rgba(78,42,132,0.2)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5 text-[#C9BDE8]" />
                <span>Book {artist.name}</span>
              </a>
              {artist.subdomain && (
                <a
                  href={getArtistUrl(artist.subdomain)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#4E2A84] border border-[#4E2A84]/16 hover:bg-[#4E2A84]/8 font-semibold px-6 py-4 rounded-2xl text-sm transition-all duration-300"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Official Site</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Biography */}
        <section className="bg-white/80 rounded-[2rem] p-6 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-[#4E2A84] font-semibold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>Biography & Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1F1F1F] font-[family-name:var(--font-recoleta)]">
            About {artist.name}
          </h2>
          <p className="text-base text-[#6E6485] leading-relaxed whitespace-pre-line">
            {artist.fullDescription || artist.description}
          </p>
        </section>

        {/* Social Links */}
        {artist.socials && (
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1F1F1F] font-[family-name:var(--font-recoleta)]">
              Social Links
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {artist.socials.instagram && artist.socials.instagram !== "#" && (
                <a
                  href={artist.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white/80 hover:bg-[#4E2A84]/8 text-[#1F1F1F] font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-[#4E2A84]" />
                  <span>Instagram</span>
                </a>
              )}
              {artist.socials.spotify && artist.socials.spotify !== "#" && (
                <a
                  href={artist.socials.spotify}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white/80 hover:bg-[#4E2A84]/8 text-[#1F1F1F] font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors"
                >
                  <Music className="w-4 h-4 text-emerald-600" />
                  <span>Spotify</span>
                </a>
              )}
              {artist.socials.youtube && artist.socials.youtube !== "#" && (
                <a
                  href={artist.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white/80 hover:bg-[#4E2A84]/8 text-[#1F1F1F] font-semibold text-xs px-3.5 py-2 rounded-xl transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-600" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </section>
        )}

        {/* Released Songs — selected artist only */}
        {artistReleases.length > 0 && (
          <section className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[#4E2A84] font-semibold text-xs uppercase tracking-wider">
                <Disc className="w-4 h-4" />
                <span>Discography</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-semibold text-[#1F1F1F] font-[family-name:var(--font-recoleta)]">
                Releases by {artist.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {artistReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </section>
        )}

        {/* Booking */}
        <BookingSelector artistName={artist.name} />
      </main>

      <Footer />
    </div>
  );
}
