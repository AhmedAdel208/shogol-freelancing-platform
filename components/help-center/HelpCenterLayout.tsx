import { ReactNode } from "react";
import Navlinks from "@/components/ui/header/Navlinks";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";

interface HelpCenterLayoutProps {
  children: ReactNode;
}

export default function HelpCenterLayout({ children }: HelpCenterLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
     <LinksHeader />
      
      {/* Main Content */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
