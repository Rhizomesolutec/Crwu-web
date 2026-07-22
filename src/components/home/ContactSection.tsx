"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/common/Icons";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CRWU Contact Form Submission:", form);
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#2B154B]/10 text-[#2B154B] text-xs font-bold uppercase tracking-wider font-mono">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#2B154B] tracking-tight">
              Connect with CRWU
            </h2>
            <p className="text-base text-[#6E6485]">
              Have questions about booking an artist, technical requirements, or custom stage productions? Contact our management team directly.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#B7A7D6]/30 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#2B154B] text-[#B7A7D6] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#6E6485] uppercase font-mono">Booking Email</p>
                <a href="mailto:booking@crwu.com" className="text-base font-extrabold text-[#2B154B] hover:underline">
                  booking@crwu.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#B7A7D6]/30 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#2B154B] text-[#B7A7D6] flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#6E6485] uppercase font-mono">Direct Phone / Hotline</p>
                <a href="tel:+919876543210" className="text-base font-extrabold text-[#2B154B] hover:underline">
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* WhatsApp Booking Button */}
            <a
              href="https://wa.me/919876543210?text=Hi%20CRWU%20Team,%20I%20want%20to%20book%20an%20artist"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Instant WhatsApp Booking</span>
            </a>
          </div>

          <div className="pt-4 border-t border-[#B7A7D6]/30 flex items-center gap-4">
            <span className="text-xs font-bold text-[#6E6485] uppercase font-mono">Follow CRWU:</span>
            <div className="flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B154B]/10 text-[#2B154B] flex items-center justify-center hover:bg-[#2B154B] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B154B]/10 text-[#2B154B] flex items-center justify-center hover:bg-[#2B154B] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#B7A7D6]/40 shadow-xl">
          {sent ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#2B154B] mx-auto" />
              <h3 className="text-2xl font-bold text-[#2B154B]">Message Sent Successfully</h3>
              <p className="text-sm text-[#6E6485]">
                Thank you for reaching out! We will get back to you shortly.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-xs font-bold text-[#2B154B] underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-extrabold text-[#2B154B] mb-2">Send Us a Direct Message</h3>

              <div>
                <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#F5F2FB] border border-[#B7A7D6]/40 rounded-xl px-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#F5F2FB] border border-[#B7A7D6]/40 rounded-xl px-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Festival Headliner Inquiry"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-[#F5F2FB] border border-[#B7A7D6]/40 rounded-xl px-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B154B] uppercase tracking-wider mb-1 font-mono">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist your event?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#F5F2FB] border border-[#B7A7D6]/40 rounded-xl px-4 py-3 text-sm text-[#1E1330] placeholder-[#6E6485]/60 focus:outline-none focus:border-[#2B154B] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2B154B] hover:bg-[#4B2E83] text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#B7A7D6]" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
