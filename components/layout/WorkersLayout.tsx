import Gradientline from "@/components/ui/header/Gradientline";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Footer from "@/components/landing/footer/Footer";
import { WorkersLayoutProps } from "@/types/workersLayout";

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
