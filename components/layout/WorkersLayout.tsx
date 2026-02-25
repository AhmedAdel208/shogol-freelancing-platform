import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import React from "react";

interface WorkersLayoutProps {
  children: React.ReactNode;
}

export default function WorkersLayout({ children }: WorkersLayoutProps) {
  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      {children}
      <Footer />
    </div>
  );
}
