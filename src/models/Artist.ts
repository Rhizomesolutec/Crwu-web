import mongoose, { Schema, models, model, type InferSchemaType } from "mongoose";

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
