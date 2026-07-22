"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  UserCheck,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageCircle,
  Mail,
  Phone,
  Lock,
  Eye,
  RefreshCw,
  Sparkles,
  ChevronDown
} from "lucide-react";
import {
  getStoredBookings,
  updateBookingStatus,
  BookingRequest,
  BookingStatus,
  BookingCategory
} from "@/lib/bookingStore";
import { ARTISTS } from "@/constants/artists";

export function AdminDashboard() {
  // Account role state: "SUPER_ADMIN" or specific artist name (e.g. "M.H.R", "SA")
  const [activeRole, setActiveRole] = useState<string>("SUPER_ADMIN");

  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  useEffect(() => {
    setBookings(getStoredBookings());
  }, []);

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    const updated = updateBookingStatus(id, newStatus);
    setBookings(updated);
  };

  // Strict isolation filter
  const roleFilteredBookings = useMemo(() => {
    if (activeRole === "SUPER_ADMIN") {
      return bookings;
    }
    // Strictly match artist name
    return bookings.filter(
      (b) => b.artistRequested.toLowerCase() === activeRole.toLowerCase()
    );
  }, [bookings, activeRole]);

  // Apply search & status filters on top of role isolation
  const finalBookings = useMemo(() => {
    return roleFilteredBookings.filter((b) => {
      const matchesSearch =
        b.organizerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.artistRequested.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || b.status.toUpperCase() === statusFilter.toUpperCase();

      const matchesType =
        typeFilter === "ALL" || b.bookingType.toUpperCase() === typeFilter.toUpperCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [roleFilteredBookings, searchQuery, statusFilter, typeFilter]);

  // Metrics calculated strictly for active role
  const metrics = useMemo(() => {
    const total = roleFilteredBookings.length;
    const pending = roleFilteredBookings.filter((b) => b.status === "Pending").length;
    const confirmed = roleFilteredBookings.filter((b) => b.status === "Confirmed").length;
    const revenue = roleFilteredBookings.reduce((sum, b) => sum + b.estimatedFee, 0);

    return { total, pending, confirmed, revenue };
  }, [roleFilteredBookings]);

  const activeArtistObj = ARTISTS.find(
    (a) => a.name.toLowerCase() === activeRole.toLowerCase()
  );

  return (
    <div className="space-y-8">
      
      {/* Role & Access Mode Switcher Bar */}
      <div className="bg-white rounded-3xl p-6 border border-[#B7A7D6]/40 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2B154B] text-[#B7A7D6] flex items-center justify-center shadow-md">
              {activeRole === "SUPER_ADMIN" ? (
                <ShieldCheck className="w-6 h-6" />
              ) : (
                <UserCheck className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4B2E83] font-mono">
                CRWU Access Portal
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#2B154B]">
                {activeRole === "SUPER_ADMIN"
                  ? "Super Admin Dashboard (Global Overview)"
                  : `${activeRole} - Artist Portal`}
              </h2>
            </div>
          </div>

          {/* Selector Dropdown / Pills */}
          <div className="w-full sm:w-auto flex items-center gap-2 bg-[#F5F2FB] p-1.5 rounded-2xl border border-[#B7A7D6]/30">
            <span className="text-xs font-bold text-[#6E6485] px-2 font-mono flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#2B154B]" />
              <span>Login Profile:</span>
            </span>

            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
              className="bg-white font-extrabold text-xs text-[#2B154B] px-3 py-2 rounded-xl border border-[#B7A7D6]/40 focus:outline-none cursor-pointer"
            >
              <option value="SUPER_ADMIN">🔑 Super Admin (All Bookings)</option>
              <optgroup label="Artist Roster Accounts">
                {ARTISTS.map((a) => (
                  <option key={a.id} value={a.name}>
                    🎤 {a.name} ({a.genre})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

        </div>

        {/* Data Isolation Notice Banner when in Artist Mode */}
        {activeRole !== "SUPER_ADMIN" && (
          <div className="bg-[#2B154B]/10 border border-[#B7A7D6]/40 rounded-2xl p-4 flex items-center gap-3 text-xs text-[#2B154B]">
            <Sparkles className="w-4 h-4 text-[#4B2E83] flex-shrink-0" />
            <span>
              <strong className="font-bold">Strict Data Isolation Active:</strong> Logged in as{" "}
              <span className="font-extrabold underline">{activeRole}</span>. Only booking requests submitted specifically for {activeRole} are displayed below. All other artist data is hidden.
            </span>
          </div>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Bookings */}
        <div className="bg-white rounded-2xl p-5 border border-[#B7A7D6]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#6E6485] font-mono">Total Requests</p>
            <p className="text-2xl sm:text-3xl font-black text-[#2B154B] mt-1">{metrics.total}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#2B154B]/10 text-[#2B154B] flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-2xl p-5 border border-[#B7A7D6]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#6E6485] font-mono">Pending Review</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{metrics.pending}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Confirmed Shows */}
        <div className="bg-white rounded-2xl p-5 border border-[#B7A7D6]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#6E6485] font-mono">Confirmed Shows</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{metrics.confirmed}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Estimated Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-[#B7A7D6]/30 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-[#6E6485] font-mono">Est. Booking Value</p>
            <p className="text-xl sm:text-2xl font-black text-[#2B154B] mt-1">
              ₹{metrics.revenue.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-[#2B154B] text-[#B7A7D6] flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-3xl p-6 border border-[#B7A7D6]/30 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#6E6485] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search organizer, venue, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F2FB] border border-[#B7A7D6]/40 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#1E1330] focus:outline-none focus:border-[#2B154B]"
            />
          </div>

          {/* Status & Type Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            
            {/* Status Filter */}
            <div className="flex items-center bg-[#F5F2FB] p-1 rounded-xl border border-[#B7A7D6]/30">
              {["ALL", "PENDING", "CONFIRMED", "COMPLETED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono uppercase transition-all ${
                    statusFilter === st
                      ? "bg-[#2B154B] text-white shadow-xs"
                      : "text-[#6E6485] hover:text-[#2B154B]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex items-center bg-[#F5F2FB] p-1 rounded-xl border border-[#B7A7D6]/30">
              {["ALL", "CONCERT", "STAGE SHOW", "COLLABORATION"].map((tp) => (
                <button
                  key={tp}
                  onClick={() => setTypeFilter(tp)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold font-mono uppercase transition-all ${
                    typeFilter === tp
                      ? "bg-[#2B154B] text-white shadow-xs"
                      : "text-[#6E6485] hover:text-[#2B154B]"
                  }`}
                >
                  {tp}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-bold text-[#2B154B]">
            Booking Inquiries ({finalBookings.length})
          </h3>
          <span className="text-xs text-[#6E6485] font-mono">
            Showing records for: <strong className="text-[#2B154B]">{activeRole}</strong>
          </span>
        </div>

        {finalBookings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {finalBookings.map((b) => {
              const statusColors = {
                Pending: "bg-amber-100 text-amber-800 border-amber-300",
                Confirmed: "bg-emerald-100 text-emerald-800 border-emerald-300",
                Completed: "bg-blue-100 text-blue-800 border-blue-300",
                Cancelled: "bg-rose-100 text-rose-800 border-rose-300"
              };

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-6 border border-[#B7A7D6]/30 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#B7A7D6]/20">
                    
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-black bg-[#2B154B]/10 text-[#2B154B] px-3 py-1 rounded-full">
                        {b.id}
                      </span>
                      <h4 className="text-lg font-extrabold text-[#2B154B]">{b.organizerName}</h4>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#4B2E83] bg-[#B7A7D6]/20 px-2.5 py-0.5 rounded-md font-mono">
                        {b.bookingType}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                          statusColors[b.status]
                        }`}
                      >
                        {b.status}
                      </span>

                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                        className="text-xs font-bold bg-[#F5F2FB] text-[#2B154B] border border-[#B7A7D6]/40 px-2.5 py-1.5 rounded-xl cursor-pointer focus:outline-none"
                      >
                        <option value="Pending">Set Pending</option>
                        <option value="Confirmed">Set Confirmed</option>
                        <option value="Completed">Set Completed</option>
                        <option value="Cancelled">Set Cancelled</option>
                      </select>
                    </div>

                  </div>

                  {/* Body Content */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#1E1330]">
                    
                    <div>
                      <p className="font-mono text-[11px] font-bold text-[#6E6485] uppercase">Artist Requested</p>
                      <p className="font-extrabold text-[#2B154B] text-sm mt-0.5">{b.artistRequested}</p>
                      <p className="font-mono text-[11px] font-bold text-[#6E6485] uppercase mt-2">Est. Fee</p>
                      <p className="font-bold text-[#2B154B] mt-0.5">₹{b.estimatedFee.toLocaleString("en-IN")}</p>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] font-bold text-[#6E6485] uppercase">Event Date & Venue</p>
                      <p className="font-bold text-[#2B154B] mt-0.5">{b.eventDate}</p>
                      <p className="text-[#6E6485] mt-0.5">{b.venue}</p>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] font-bold text-[#6E6485] uppercase">Organizer Contact</p>
                      <p className="font-medium text-[#2B154B] mt-0.5">{b.email}</p>
                      <p className="font-medium text-[#6E6485] mt-0.5">{b.phone}</p>
                    </div>

                  </div>

                  {/* Organizer Note */}
                  {b.message && (
                    <div className="bg-[#F5F2FB] p-3 rounded-2xl border border-[#B7A7D6]/20 text-xs text-[#6E6485]">
                      <span className="font-bold text-[#2B154B]">Message: </span>
                      <span>"{b.message}"</span>
                    </div>
                  )}

                  {/* Quick Action Contact Buttons */}
                  <div className="pt-3 border-t border-[#B7A7D6]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-[11px] text-[#6E6485] font-mono">
                      Received: {new Date(b.submittedAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                          b.organizerName
                        )},%20regarding%20your%20booking%20request%20for%20${encodeURIComponent(
                          b.artistRequested
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Organizer</span>
                      </a>

                      <a
                        href={`mailto:${b.email}?subject=CRWU%20Booking%20Inquiry%20-${b.id}`}
                        className="inline-flex items-center gap-1.5 bg-[#2B154B] hover:bg-[#4B2E83] text-white font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#B7A7D6]" />
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#B7A7D6]/30 space-y-3">
            <AlertCircle className="w-10 h-10 text-[#B7A7D6] mx-auto" />
            <h4 className="text-xl font-extrabold text-[#2B154B]">No Booking Requests Found</h4>
            <p className="text-sm text-[#6E6485] max-w-md mx-auto">
              There are currently no booking records matching your active filters for{" "}
              <strong className="text-[#2B154B]">{activeRole}</strong>.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
