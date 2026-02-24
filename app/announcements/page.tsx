import AdsSection from "@/components/announcements/ads";

import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";

export default function AnnouncementsPage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <AdsSection />
      <Footer />
    </div>
  );
}
