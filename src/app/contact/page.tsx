import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata = {
  title: "Contact & Booking | CRWU",
  description: "Get in touch with CRWU management for live concerts, festival stage shows, and studio collaboration bookings."
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1F1F1F]">
      <Navbar />

      <main className="pt-28 pb-20">
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
