import ContactSection from "@/components/landing/contact/ContactSection";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <ContactSection />
      <Footer />
    </div>
  );
}
