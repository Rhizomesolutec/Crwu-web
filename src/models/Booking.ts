import mongoose, { Schema, models, model, type InferSchemaType } from "mongoose";

export const BOOKING_TYPES = ["Concert", "Stage Show", "Collaboration"] as const;
export type BookingType = (typeof BOOKING_TYPES)[number];

export const BOOKING_STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"] as const;
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

const BookingSchema = new Schema(
  {
    artist: { type: String, required: true, trim: true },
    bookingType: {
      type: String,
      required: true,
      enum: BOOKING_TYPES,
    },
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    eventDate: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "Pending",
    },
    estimatedFee: { type: Number, default: 50000 },
    bookingCode: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export type BookingDocument = InferSchemaType<typeof BookingSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BookingModel =
  models.Booking || model("Booking", BookingSchema);
