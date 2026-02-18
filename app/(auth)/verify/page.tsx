import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import VerifyPage from "@/features/auth/verify/VerifyPage";

export default function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <LinksHeader />

      <div className="grow">
        <VerifyPage />
      </div>

      <Footer />
    </div>
  );
}
