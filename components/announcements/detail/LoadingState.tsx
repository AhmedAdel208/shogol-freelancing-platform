import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";
import { DetailLoadingStateProps } from "@/types/detailComponents";

export default function LoadingState({
  message = "جاري تحميل تفاصيل المشروع...",
}: DetailLoadingStateProps) {
  return (
    <div className="bg-white min-h-screen w-full">
      <Gradientline />
      <LinksHeader />
      <div className="px-4 md:px-6 lg:px-8 max-w-8xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-medium">{message}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
