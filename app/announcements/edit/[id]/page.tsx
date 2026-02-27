"use client";
import { useRouter } from "next/navigation";
import EditProjectPage from "@/container/actions/EditProjectPage";
import BackArrowIcon from "@/public/icons/BackArrowIcon";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";
import Gradientline from "@/components/ui/header/Gradientline";

export default function EditProjectPageWrapper() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <header className="bg-white">
        <Gradientline />
        <LinksHeader />
      </header>
      <div className="max-w-2xl mx-auto min-h-[90vh] justify-center flex flex-col">
        <div className="mb-12 ">
          <button
            onClick={handleCancel}
            className="text-gray-700 hover:text-primary flex items-center cursor-pointer gap-2 mb-4 transition-colors"
          >
            <BackArrowIcon className="w-5 h-5" />
            <span>العودة للمشروع</span>
          </button>
          <h1 className="text-3xl font-bold text-black/70 mb-2">
            تعديل المشروع
          </h1>
          <p className="text-gray-700">قم بتعديل تفاصيل مشروعك</p>
        </div>

        {/* Form Component */}
        <EditProjectPage />
      </div>

      <Footer />
    </div>
  );
}
