import { NextRequest, NextResponse } from "next/server";
import { updateBookingStatus } from "@/lib/data/bookings";
import { BOOKING_STATUSES, type BookingStatus } from "@/models/Booking";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const status = body.status as BookingStatus;

    if (!BOOKING_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const bookings = await updateBookingStatus(id, status);
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("PATCH /api/bookings/[id]:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}
