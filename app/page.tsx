import ContactSection from "@/components/landing/contact-section/ContactSection";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import NewHero from "@/components/landing/heroImg/NewHero";
import PriceRequestSection from "@/components/landing/price-request/PriceRequestSection";
import WhatShouldDo from "@/components/landing/price-request/WhatShouldDo";
import ServicesSection from "@/components/landing/services-section/ServicesSection";
import Gradientline from "@/components/ui/header/Gradientline";

export default function page() {
  return (
    <div className="bg-white">
      <Gradientline />
      <LinksHeader />
      <NewHero />
      <PriceRequestSection />
      <WhatShouldDo />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
