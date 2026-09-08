import mongoose, { Schema, models, model, type InferSchemaType } from "mongoose";
import { SUBDOMAIN_PATTERN } from "@/lib/domain";

const SocialLinksSchema = new Schema(
  {
    instagram: String,
    spotify: String,
    youtube: String,
  },
  { _id: false }
);

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    /**
     * URL-safe label used for the artist's dedicated subdomain microsite,
     * e.g. "mhr" -> mhr.crwu.com. Kept separate from `slug` because slugs
     * may contain hyphens ("lil-payyan") that aren't wanted in a subdomain
     * ("lilpayyan"). See src/lib/domain.ts for parsing/validation helpers.
     *
     * `sparse: true` lets this unique index roll out safely on documents
     * that were created before this field existed — syncArtistsFromSeed()
     * in src/lib/data/artists.ts backfills every existing artist with its
     * subdomain immediately on the next read, so in practice every
     * document ends up with a unique value right after deploying this.
     */
    subdomain: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
      match: SUBDOMAIN_PATTERN,
    },
    image: { type: String, required: true },
    modalImage: { type: String },
    bio: { type: String, required: true },
    fullBio: { type: String },
    genre: { type: String, required: true },
    socialLinks: { type: SocialLinksSchema, default: {} },
    bookingAvailable: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ArtistDocument = InferSchemaType<typeof ArtistSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ArtistModel =
  models.Artist || model("Artist", ArtistSchema);
