import { ReactNode } from "react";
import Navlinks from "@/components/ui/header/Navlinks";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";

interface HelpCenterLayoutProps {
  children: ReactNode;
}

export default function HelpCenterLayout({ children }: HelpCenterLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-primary/30 overflow-x-clip relative">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(30,170,173,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <LinksHeader />
        
        {/* Main Content */}
        <main className="pt-20">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
