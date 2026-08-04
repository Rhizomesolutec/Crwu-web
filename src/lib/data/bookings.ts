import { connectDB } from "@/lib/mongodb";
import { BookingModel, type BookingStatus, type BookingType } from "@/models/Booking";
import type { BookingRequest } from "@/types/content";

function estimateFee(bookingType: BookingType): number {
  if (bookingType === "Concert") return 75000;
  if (bookingType === "Collaboration") return 35000;
  return 50000;
}

function mapBooking(doc: {
  bookingCode: string;
  artist: string;
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  bookingType: BookingType;
  message?: string | null;
  status: BookingStatus;
  estimatedFee?: number | null;
  createdAt?: Date | string;
}): BookingRequest {
  return {
    id: doc.bookingCode,
    artistRequested: doc.artist,
    organizerName: doc.customerName,
    email: doc.email,
    phone: doc.phone,
    eventDate: doc.eventDate,
    venue: doc.venue,
    bookingType: doc.bookingType,
    message: doc.message || "",
    status: doc.status,
    submittedAt:
      typeof doc.createdAt === "string"
        ? doc.createdAt
        : doc.createdAt?.toISOString() || new Date().toISOString(),
    estimatedFee: doc.estimatedFee ?? estimateFee(doc.bookingType),
  };
}

export async function getBookings(): Promise<BookingRequest[]> {
  await connectDB();
  const docs = await BookingModel.find().sort({ createdAt: -1 }).lean();
  return docs.map(mapBooking);
}

export async function createBooking(input: {
  artist: string;
  bookingType: BookingType;
  customerName: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  message?: string;
}): Promise<BookingRequest> {
  await connectDB();

  const bookingCode = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
  const estimatedFee = estimateFee(input.bookingType);

  const doc = await BookingModel.create({
    ...input,
    message: input.message || "",
    status: "Pending",
    estimatedFee,
    bookingCode,
  });

  return mapBooking(doc.toObject());
}

export async function updateBookingStatus(
  bookingCode: string,
  status: BookingStatus
): Promise<BookingRequest[]> {
  await connectDB();
  await BookingModel.findOneAndUpdate({ bookingCode }, { status });
  return getBookings();
}
