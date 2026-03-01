import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { ErrorStateProps } from "@/types/detailComponents";

export default function ErrorState({
  title = "المشروع غير موجود",
  message = "للأسف، لم نتمكن من العثور على المشروع المطلوب.",
  backButtonText = "العودة للإعلانات",
  backButtonHref = "/announcements",
}: ErrorStateProps) {
  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <div className="px-4 md:px-6 lg:px-8 max-w-8xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-dark mb-4">
            {title}
          </h1>
          <p className="text-gray-medium mb-6">{message}</p>
          <Link
            href={backButtonHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            {backButtonText}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
