"use client";

import { useState } from "react";
import { Send, CheckCircle, Calendar, MapPin, User, Mail, Phone as PhoneIcon, MessageSquare } from "lucide-react";
import type { BookingType } from "./BookingSelector";
import { saveBookingRequest } from "@/lib/bookingStore";

interface BookingFormProps {
  bookingType: BookingType;
  artistName?: string;
}

export function BookingForm({ bookingType, artistName }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    venue: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveBookingRequest({
        artistRequested: artistName || "General Roster / Unspecified",
        organizerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate,
        venue: formData.venue,
        bookingType,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Booking submission failed:", error);
      alert("Unable to submit booking right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#FAF8FC] rounded-2xl p-8 border border-[#B7A7D6]/50 text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-[#2B154B] rounded-full flex items-center justify-center mx-auto text-[#B7A7D6] shadow-lg">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h4 className="text-2xl font-extrabold text-[#2B154B]">Booking Request Received!</h4>
        <p className="text-sm text-[#6E6485] max-w-md mx-auto">
          Thank you <span className="font-bold text-[#2B154B]">{formData.name}</span>. Our CRWU artist management team will review your event details for <span className="font-bold text-[#2B154B]">{bookingType}</span> and contact you at <span className="font-bold text-[#2B154B]">{formData.email}</span> within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              eventDate: "",
              venue: "",
              message: "",
            });
          }}
          className="inline-block mt-4 text-xs font-bold text-[#2B154B] hover:text-[#4B2E83] underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
            Your Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#FAF8FC] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B] focus:ring-1 focus:ring-[#2B154B] transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              placeholder="e.g. organizer@event.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#FAF8FC] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B] focus:ring-1 focus:ring-[#2B154B] transition-all"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
            Phone / WhatsApp *
          </label>
          <div className="relative">
            <PhoneIcon className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#FAF8FC] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B] focus:ring-1 focus:ring-[#2B154B] transition-all"
            />
          </div>
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
            Event Date *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="date"
              required
              value={formData.eventDate}
              onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
              className="w-full bg-[#FAF8FC] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1E1330] focus:outline-none focus:border-[#2B154B] focus:ring-1 focus:ring-[#2B154B] transition-all"
            />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Venue / City */}
        <div>
          <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
            Venue / City *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              placeholder="e.g. Kochi Arena / Bangalore"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full bg-[#FAF8FC] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B] focus:ring-1 focus:ring-[#2B154B] transition-all"
            />
          </div>
        </div>

        {/* Selected Booking Type (Auto-filled) */}
        <div>
          <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
            Selected Booking Type
          </label>
          <input
            type="text"
            readOnly
            value={bookingType}
            className="w-full bg-[#2B154B]/10 border border-[#B7A7D6]/40 rounded-xl px-4 py-3 text-sm font-bold text-[#2B154B] cursor-not-allowed"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
          Event Details & Requirements
        </label>
        <div className="relative">
          <MessageSquare className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
          <textarea
            rows={3}
            placeholder="Tell us about expected audience size, stage specs, or specific songs..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full bg-[#FAF8FC] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B] focus:ring-1 focus:ring-[#2B154B] transition-all resize-none"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2B154B] hover:bg-[#4B2E83] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#2B154B]/20 transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
      >
        {loading ? (
          <span className="inline-block animate-pulse">Processing...</span>
        ) : (
          <>
            <Send className="w-4 h-4 text-[#B7A7D6]" />
            <span>Send Booking Request</span>
          </>
        )}
      </button>
    </form>
  );
}
