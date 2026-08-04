import mongoose, { Schema, models, model, type InferSchemaType } from "mongoose";

const StreamingLinksSchema = new Schema(
  {
    spotify: String,
    youtube: String,
    apple: String,
  },
  { _id: false }
);

const ReleaseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    artist: { type: String, required: true, trim: true },
    cover: { type: String, required: true },
    releaseDate: { type: String, required: true },
    type: { type: String, required: true },
    tracks: { type: Schema.Types.Mixed, default: 1 },
    duration: { type: String, default: "" },
    accent: { type: String, default: "#7B61FF" },
    tag: { type: String, default: "OUT NOW" },
    description: { type: String, default: "" },
    streamingLinks: { type: StreamingLinksSchema, default: {} },
    upcoming: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type ReleaseDocument = InferSchemaType<typeof ReleaseSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const ReleaseModel =
  models.Release || model("Release", ReleaseSchema);
