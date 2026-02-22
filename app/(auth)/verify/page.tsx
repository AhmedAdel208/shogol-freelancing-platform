import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import VerifyPage from "@/features/auth/verify/VerifyPage";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen">
       <header className="bg-white">
            <Gradientline/>
            <LinksHeader/>
          </header>

      <div className="grow">
        <VerifyPage />
      </div>

      <Footer />
    </div>
  );
}
