import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/home/AboutSection";
import { BookingSelector } from "@/components/booking/BookingSelector";

export const metadata = {
  title: "About CRWU | Rap & Live Performance Platform",
  description: "Learn about CRWU - connecting concert organizers with top rap artists, beat producers, and explosive live stage acts."
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F2FB] text-[#1E1330]">
      <Navbar />

      <main className="pt-28 pb-20 space-y-12">
        <AboutSection />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingSelector />
        </div>
      </main>

      <Footer />
    </div>
  );
}
