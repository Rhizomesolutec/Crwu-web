import { NextRequest, NextResponse } from "next/server";
import { createBooking, getBookings } from "@/lib/data/bookings";
import { BOOKING_TYPES } from "@/models/Booking";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const bookings = await getBookings();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("GET /api/bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      artist,
      bookingType,
      customerName,
      email,
      phone,
      eventDate,
      venue,
      message,
    } = body;

    if (
      !artist ||
      !bookingType ||
      !customerName ||
      !email ||
      !phone ||
      !eventDate ||
      !venue
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!BOOKING_TYPES.includes(bookingType)) {
      return NextResponse.json({ error: "Invalid booking type" }, { status: 400 });
    }

    const booking = await createBooking({
      artist,
      bookingType,
      customerName,
      email,
      phone,
      eventDate,
      venue,
      message,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("POST /api/bookings:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
