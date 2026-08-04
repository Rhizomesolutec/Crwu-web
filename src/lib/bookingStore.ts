"use client";

import type { BookingCategory, BookingRequest, BookingStatus } from "@/types/content";

export type { BookingCategory, BookingRequest, BookingStatus };

export async function getStoredBookings(): Promise<BookingRequest[]> {
  try {
    const res = await fetch("/api/bookings", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load bookings");
    const data = await res.json();
    return data.bookings as BookingRequest[];
  } catch (error) {
    console.error("Failed to load bookings:", error);
    return [];
  }
}

export async function saveBookingRequest(
  booking: Omit<BookingRequest, "id" | "submittedAt" | "status" | "estimatedFee">
): Promise<BookingRequest> {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      artist: booking.artistRequested,
      bookingType: booking.bookingType,
      customerName: booking.organizerName,
      email: booking.email,
      phone: booking.phone,
      eventDate: booking.eventDate,
      venue: booking.venue,
      message: booking.message,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to save booking request");
  }

  const data = await res.json();
  return data.booking as BookingRequest;
}

export async function updateBookingStatus(
  id: string,
  newStatus: BookingStatus
): Promise<BookingRequest[]> {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!res.ok) {
    throw new Error("Failed to update booking status");
  }

  const data = await res.json();
  return data.bookings as BookingRequest[];
}
