import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin & Artist Booking Dashboard | CRWU",
  description: "Manage artist bookings, event requests, and venue scheduling for CRWU performers."
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1F1F1F]">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <AdminDashboard />
      </main>

      <Footer />
    </div>
  );
}
