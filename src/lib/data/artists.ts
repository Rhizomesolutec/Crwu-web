import { connectDB } from "@/lib/mongodb";
import { ArtistModel } from "@/models/Artist";
import { SEED_ARTISTS } from "@/lib/seed-data";
import type { Artist } from "@/types/content";

function mapArtistDoc(doc: {
  slug: string;
  name: string;
  subdomain?: string | null;
  genre: string;
  bio: string;
  fullBio?: string | null;
  image: string;
  modalImage?: string | null;
  socialLinks?: {
    instagram?: string | null;
    spotify?: string | null;
    youtube?: string | null;
  } | null;
  bookingAvailable?: boolean | null;
}): Artist {
  const seedMatch = SEED_ARTISTS.find((artist) => artist.id === doc.slug);

  return {
    id: doc.slug,
    name: doc.name,
    subdomain: doc.subdomain || seedMatch?.subdomain || doc.slug,
    genre: doc.genre,
    description: doc.bio,
    fullDescription: doc.fullBio || doc.bio,
    image: doc.image,
    modalImage: doc.modalImage || doc.image,
    imageFocus: seedMatch?.imageFocus || "center 32%",
    socials: {
      instagram: doc.socialLinks?.instagram || undefined,
      spotify: doc.socialLinks?.spotify || undefined,
      youtube: doc.socialLinks?.youtube || undefined,
    },
    bookingAvailable: doc.bookingAvailable ?? true,
  };
}

async function ensureArtistsSeeded() {
  const count = await ArtistModel.countDocuments();
  if (count > 0) return;

  await ArtistModel.insertMany(
    SEED_ARTISTS.map((artist, index) => ({
      name: artist.name,
      slug: artist.id,
      subdomain: artist.subdomain,
      image: artist.image,
      modalImage: artist.modalImage,
      bio: artist.description,
      fullBio: artist.fullDescription,
      genre: artist.genre,
      socialLinks: artist.socials,
      bookingAvailable: true,
      sortOrder: index,
    }))
  );
}

/**
 * Keep stored content in sync with seed data (order + bio copy edits).
 * Also backfills `subdomain` for artists that were created in MongoDB
 * before the subdomain-microsite feature existed — this makes the
 * unique index rollout safe/idempotent for already-seeded databases.
 */
async function syncArtistsFromSeed() {
  await Promise.all(
    SEED_ARTISTS.map((artist, index) =>
      ArtistModel.updateOne(
        { slug: artist.id },
        {
          $set: {
            sortOrder: index,
            bio: artist.description,
            fullBio: artist.fullDescription,
            subdomain: artist.subdomain,
          },
        }
      )
    )
  );
}

export async function getArtists(limit?: number): Promise<Artist[]> {
  try {
    await connectDB();
    await ensureArtistsSeeded();
    await syncArtistsFromSeed();

    const query = ArtistModel.find().sort({ sortOrder: 1, name: 1 }).lean();
    if (typeof limit === "number") {
      query.limit(limit);
    }

    const docs = await query;
    return docs.map(mapArtistDoc);
  } catch (error) {
    console.error("getArtists failed, using seed fallback:", error);
    return typeof limit === "number" ? SEED_ARTISTS.slice(0, limit) : SEED_ARTISTS;
  }
}

/** Fetch artists in an explicit featured order (home showcase). */
export async function getArtistsBySlugs(slugs: string[]): Promise<Artist[]> {
  const artists = await getArtists();
  return slugs
    .map((slug) => artists.find((artist) => artist.id === slug))
    .filter((artist): artist is Artist => Boolean(artist));
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  try {
    await connectDB();
    await ensureArtistsSeeded();
    await syncArtistsFromSeed();

    const doc = await ArtistModel.findOne({
      $or: [
        { slug: slug.toLowerCase() },
        { name: new RegExp(`^${slug.replace(/-/g, "[-\\s]")}$`, "i") },
      ],
    }).lean();

    if (!doc) {
      return (
        SEED_ARTISTS.find(
          (a) =>
            a.id.toLowerCase() === slug.toLowerCase() ||
            a.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
        ) || null
      );
    }

    return mapArtistDoc(doc);
  } catch (error) {
    console.error("getArtistBySlug failed, using seed fallback:", error);
    return (
      SEED_ARTISTS.find(
        (a) =>
          a.id.toLowerCase() === slug.toLowerCase() ||
          a.name.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
      ) || null
    );
  }
}

/**
 * Fetch a single artist by their dedicated subdomain label (e.g. "mhr"),
 * used to render the artist's microsite at mhr.<root-domain>.
 * Lookup is always by the `subdomain` field — never by display name.
 */
export async function getArtistBySubdomain(subdomain: string): Promise<Artist | null> {
  const normalized = subdomain.toLowerCase().trim();

  try {
    await connectDB();
    await ensureArtistsSeeded();
    await syncArtistsFromSeed();

    const doc = await ArtistModel.findOne({ subdomain: normalized }).lean();

    if (!doc) {
      return SEED_ARTISTS.find((a) => a.subdomain === normalized) || null;
    }

    return mapArtistDoc(doc);
  } catch (error) {
    console.error("getArtistBySubdomain failed, using seed fallback:", error);
    return SEED_ARTISTS.find((a) => a.subdomain === normalized) || null;
  }
}

export async function getArtistSlugs(): Promise<string[]> {
  try {
    await connectDB();
    await ensureArtistsSeeded();
    const docs = await ArtistModel.find({}, { slug: 1 }).lean();
    return docs.map((d) => d.slug);
  } catch {
    return SEED_ARTISTS.map((a) => a.id);
  }
}
