import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtistsDirectory } from "@/components/artists/ArtistsDirectory";
import { getArtists } from "@/lib/data/artists";

export const metadata = {
  title: "Artists | CRWU",
  description:
    "Browse the full CRWU roster of rap artists, producers, and stage performers available for booking.",
};

export const dynamic = "force-dynamic";

export default async function ArtistsDirectoryPage() {
  const artists = await getArtists();

  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1F1F1F]">
      <Navbar />
      <ArtistsDirectory artists={artists} />
      <Footer />
    </div>
  );
}
