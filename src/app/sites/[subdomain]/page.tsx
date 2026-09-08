import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, ArrowUpRight, Music2 } from "lucide-react";
import { getArtistBySubdomain } from "@/lib/data/artists";
import { getReleasesByArtistName } from "@/lib/data/releases";
import { extractSubdomain, getRootSiteUrl } from "@/lib/domain";
import { ReleaseCard } from "@/components/releases/ReleaseCard";
import { BookingSelector } from "@/components/booking/BookingSelector";
import { ArtistHero } from "@/components/artist/ArtistHero";
import { InstagramIcon, YoutubeIcon } from "@/components/common/Icons";
import type { Artist } from "@/types/content";

interface ArtistSitePageProps {
  params: Promise<{ subdomain: string }>;
}

/**
 * This internal template is only ever meant to be reached through the
 * subdomain rewrite in src/middleware.ts (e.g. mhr.localhost:3000). If
 * someone visits /sites/mhr directly on the main root domain, the Host
 * header won't resolve to a subdomain at all, so we treat that as an
 * invalid/unknown route rather than silently rendering the microsite at
 * an unintended internal URL.
 */
async function resolveArtist(subdomainParam: string): Promise<Artist | null> {
  const headerList = await headers();
  const host = headerList.get("host");
  const hostSubdomain = extractSubdomain(host);

  if (!hostSubdomain || hostSubdomain !== subdomainParam.toLowerCase()) {
    return null;
  }

  return getArtistBySubdomain(subdomainParam);
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ArtistSitePageProps): Promise<Metadata> {
  const { subdomain } = await params;
  const artist = await resolveArtist(subdomain);

  if (!artist) {
    return { title: "Artist Not Found | CRWU" };
  }

  const title = `${artist.name} | Official Artist Site | CRWU`;

  return {
    title,
    description: artist.description,
    openGraph: {
      title,
      description: artist.description,
      images: artist.image ? [artist.image] : undefined,
    },
  };
}

export default async function ArtistSitePage({ params }: ArtistSitePageProps) {
  const { subdomain } = await params;
  const artist = await resolveArtist(subdomain);

  if (!artist) {
    notFound();
  }

  const releases = await getReleasesByArtistName(artist.name);
  const rootSiteUrl = getRootSiteUrl();

  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1F1F1F]">
      {/* Minimal microsite top bar — a full multi-page Navbar isn't needed
          for a dedicated single-page artist site. */}
      <header className="border-b border-[#4E2A84]/10 bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href={rootSiteUrl} className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#4E2A84]/20">
              <Image src="/crwu logo.jpeg" alt="CRWU" fill className="object-cover" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#4E2A84]/70 group-hover:text-[#4E2A84] transition-colors">
              Powered by CRWU
            </span>
          </a>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 bg-[#4E2A84] hover:bg-[#3d2168] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Book {artist.name}</span>
          </a>
        </div>
      </header>

      {/* Artist Hero — dynamic, reusable for every artist subdomain. Renders
          full-bleed above <main> so there's no padded gap before it. */}
      <ArtistHero artist={artist} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 space-y-16">
        {/* About the Artist */}
        <section className="bg-white/80 rounded-[2rem] p-6 sm:p-10 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold font-[family-name:var(--font-recoleta)]">
            About {artist.name}
          </h2>
          <p className="text-base text-[#6E6485] leading-relaxed whitespace-pre-line">
            {artist.fullDescription || artist.description}
          </p>
        </section>

        {/* Released Music — only this artist's releases (and any
            collaborations where they're credited), via the existing
            getReleasesByArtistName() matcher shared with /artists/[slug]. */}
        {releases.length > 0 && (
          <section id="releases" className="space-y-6 scroll-mt-8">
            <h2 className="text-2xl sm:text-4xl font-semibold font-[family-name:var(--font-recoleta)]">
              Released Music
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {releases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </section>
        )}

        {/* Social / Streaming */}
        {(artist.socials.instagram && artist.socials.instagram !== "#") ||
        (artist.socials.spotify && artist.socials.spotify !== "#") ||
        (artist.socials.youtube && artist.socials.youtube !== "#") ? (
          <section className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-semibold font-[family-name:var(--font-recoleta)]">
              Connect & Stream
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {artist.socials.instagram && artist.socials.instagram !== "#" && (
                <a
                  href={artist.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${artist.name} Instagram`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#4E2A84]/8 text-[#1F1F1F] font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-[#4E2A84]/12 transition-colors"
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
                  aria-label={`${artist.name} Spotify`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#4E2A84]/8 text-[#1F1F1F] font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-[#4E2A84]/12 transition-colors"
                >
                  <Music2 className="w-4 h-4 text-emerald-600" />
                  <span>Spotify</span>
                </a>
              )}
              {artist.socials.youtube && artist.socials.youtube !== "#" && (
                <a
                  href={artist.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${artist.name} YouTube`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#4E2A84]/8 text-[#1F1F1F] font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-[#4E2A84]/12 transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-600" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </section>
        ) : null}

        {/* Booking — reuses the existing booking system. Because the
            artist name comes straight from the validated database record
            (not user input), every submission from this microsite is
            automatically and correctly associated with this artist. */}
        <BookingSelector artistName={artist.name} />
      </main>

      <footer className="border-t border-[#4E2A84]/10 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6485]">
          <p>
            © {new Date().getFullYear()} {artist.name}. All rights reserved.
          </p>
          <a
            href={rootSiteUrl}
            className="inline-flex items-center gap-1 font-semibold text-[#4E2A84] hover:text-[#7B61FF] transition-colors"
          >
            <span>Explore more CRWU artists</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
