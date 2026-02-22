import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import AnnouncementsSection from "@/components/announcements/AnnouncementsSection";

export default function AnnouncementsPage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <AnnouncementsSection />
      <Footer />
    </div>
  );
}
