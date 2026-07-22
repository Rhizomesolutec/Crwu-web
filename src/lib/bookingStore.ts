"use client";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
export type BookingCategory = "Concert" | "Stage Show" | "Collaboration";

export interface BookingRequest {
  id: string;
  artistRequested: string;
  organizerName: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  bookingType: BookingCategory;
  message: string;
  status: BookingStatus;
  submittedAt: string;
  estimatedFee: number;
}

const STORAGE_KEY = "crwu_bookings_v1";

// Initial seed mock bookings for testing artist isolation (M.H.R, SA, JOKER390P, etc.)
const SEED_BOOKINGS: BookingRequest[] = [
  {
    id: "BK-1001",
    artistRequested: "M.H.R",
    organizerName: "Kochi Music Fest LLC",
    email: "events@kochifest.in",
    phone: "+91 98470 12345",
    eventDate: "2026-08-15",
    venue: "Bolgatty Palace Grounds, Kochi",
    bookingType: "Concert",
    message: "Headline 75-min EDM Hip-Hop stage act for Independence Day Sound Fest.",
    status: "Confirmed",
    submittedAt: "2026-07-20T10:30:00Z",
    estimatedFee: 85000
  },
  {
    id: "BK-1002",
    artistRequested: "M.H.R",
    organizerName: "Underground Beats Club",
    email: "booking@undergroundbeats.com",
    phone: "+91 97455 67890",
    eventDate: "2026-09-02",
    venue: "Club Fahrenheit, Bangalore",
    bookingType: "Stage Show",
    message: "Late night club showcase set featuring new singles.",
    status: "Pending",
    submittedAt: "2026-07-21T14:15:00Z",
    estimatedFee: 60000
  },
  {
    id: "BK-1003",
    artistRequested: "SA",
    organizerName: "Calicut HipHop Jam",
    email: "jam@calicuthiphop.org",
    phone: "+91 98951 11223",
    eventDate: "2026-08-28",
    venue: "Calicut Beach Open Amphitheatre",
    bookingType: "Concert",
    message: "Experimental rap headliner slot.",
    status: "Confirmed",
    submittedAt: "2026-07-18T09:00:00Z",
    estimatedFee: 70000
  },
  {
    id: "BK-1004",
    artistRequested: "JOKER390P",
    organizerName: "Trap City Productions",
    email: "contact@trapcity.in",
    phone: "+91 99612 33445",
    eventDate: "2026-09-10",
    venue: "Trivandrum Golf Club Grounds",
    bookingType: "Concert",
    message: "Heavy drill & trap mainstage set.",
    status: "Pending",
    submittedAt: "2026-07-22T08:45:00Z",
    estimatedFee: 80000
  },
  {
    id: "BK-1005",
    artistRequested: "Haniya Nafisa",
    organizerName: "Indie Soul Festival",
    email: "info@indiesoul.com",
    phone: "+91 94471 88990",
    eventDate: "2026-10-05",
    venue: "Durbar Hall Ground, Ernakulam",
    bookingType: "Concert",
    message: "Acoustic & multi-genre live performance showcasing VAAKKATH album.",
    status: "Confirmed",
    submittedAt: "2026-07-19T16:20:00Z",
    estimatedFee: 90000
  },
  {
    id: "BK-1006",
    artistRequested: "M.H.R",
    organizerName: "Studio Wave Productions",
    email: "producer@studiowave.com",
    phone: "+91 98460 55443",
    eventDate: "2026-08-05",
    venue: "Kochi Recording Studio",
    bookingType: "Collaboration",
    message: "Studio feature verse & chorus collaboration for upcoming Malayalam rap album.",
    status: "Completed",
    submittedAt: "2026-07-10T11:00:00Z",
    estimatedFee: 40000
  }
];

export function getStoredBookings(): BookingRequest[] {
  if (typeof window === "undefined") return SEED_BOOKINGS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BOOKINGS));
      return SEED_BOOKINGS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load stored bookings:", e);
    return SEED_BOOKINGS;
  }
}

export function saveBookingRequest(booking: Omit<BookingRequest, "id" | "submittedAt" | "status" | "estimatedFee">): BookingRequest {
  const current = getStoredBookings();
  
  // Estimate pricing based on type
  let fee = 50000;
  if (booking.bookingType === "Concert") fee = 75000;
  if (booking.bookingType === "Collaboration") fee = 35000;

  const newBooking: BookingRequest = {
    ...booking,
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    submittedAt: new Date().toISOString(),
    status: "Pending",
    estimatedFee: fee
  };

  const updated = [newBooking, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return newBooking;
}

export function updateBookingStatus(id: string, newStatus: BookingStatus): BookingRequest[] {
  const current = getStoredBookings();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status: newStatus } : item
  );
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
