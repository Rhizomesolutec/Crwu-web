import { connectDB } from "@/lib/mongodb";
import { ReleaseModel } from "@/models/Release";
import { SEED_RELEASES } from "@/lib/seed-data";
import type { Release } from "@/types/content";

function mapReleaseDoc(doc: {
  slug: string;
  title: string;
  artist: string;
  type: string;
  tracks?: number | string | null;
  releaseDate: string;
  duration?: string | null;
  cover: string;
  accent?: string | null;
  tag?: string | null;
  description?: string | null;
  streamingLinks?: { spotify?: string | null } | null;
  upcoming?: boolean | null;
}): Release {
  return {
    id: doc.slug,
    title: doc.title,
    artist: doc.artist,
    type: doc.type,
    tracks: doc.tracks ?? 1,
    date: doc.releaseDate,
    duration: doc.duration || "",
    cover: doc.cover,
    accent: doc.accent || "#7B61FF",
    tag: doc.tag || "OUT NOW",
    description: doc.description || "",
    link: doc.streamingLinks?.spotify || undefined,
    upcoming: doc.upcoming ?? false,
    loading: "lazy",
  };
}

async function ensureReleasesSeeded() {
  const count = await ReleaseModel.countDocuments();
  if (count > 0) return;

  await ReleaseModel.insertMany(
    SEED_RELEASES.map((release) => ({
      slug: release.id,
      title: release.title,
      artist: release.artist,
      cover: release.cover,
      releaseDate: release.date,
      type: release.type,
      tracks: release.tracks,
      duration: release.duration,
      accent: release.accent,
      tag: release.tag,
      description: release.description,
      streamingLinks: { spotify: release.link },
      upcoming: release.upcoming ?? false,
    }))
  );
}

export async function getReleases(limit?: number): Promise<Release[]> {
  try {
    await connectDB();
    await ensureReleasesSeeded();

    const query = ReleaseModel.find().sort({ createdAt: -1 }).lean();
    if (typeof limit === "number") {
      query.limit(limit);
    }

    const docs = await query;
    return docs.map(mapReleaseDoc);
  } catch (error) {
    console.error("getReleases failed, using seed fallback:", error);
    return typeof limit === "number" ? SEED_RELEASES.slice(0, limit) : SEED_RELEASES;
  }
}

export async function getReleasesByArtistName(artistName: string): Promise<Release[]> {
  const all = await getReleases();
  return all.filter((r) =>
    r.artist.toLowerCase().includes(artistName.toLowerCase())
  );
}
