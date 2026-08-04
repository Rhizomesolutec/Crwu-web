export interface ArtistSocials {
  instagram?: string;
  spotify?: string;
  youtube?: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  description: string;
  fullDescription: string;
  image: string;
  modalImage: string;
  /** CSS object-position for face/head framing in showcase images */
  imageFocus?: string;
  socials: ArtistSocials;
  bookingAvailable?: boolean;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  type: string;
  tracks: number | string;
  date: string;
  duration: string;
  cover: string;
  accent: string;
  tag: string;
  description: string;
  link?: string;
  audio?: string;
  upcoming?: boolean;
  loading?: "lazy" | "eager";
}

export type BookingCategory = "Concert" | "Stage Show" | "Collaboration";
export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

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
