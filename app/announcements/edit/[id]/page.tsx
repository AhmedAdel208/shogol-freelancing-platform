// app/announcements/edit/[id]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import EditProjectPage from "@/container/actions/EditProjectPage";
import Footer from "@/components/landing/footer/Footer";
import LinksHeader from "@/components/landing/header/LinksHeader";

export default function EditProjectPageWrapper() {
  const router = useRouter();

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen ">
      <header>
        <LinksHeader />
      </header>
      <div className="max-w-2xl mx-auto flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-white flex items-center gap-2 mb-4 transition-colors"
          >
            <span>←</span>
            <span>العودة للمشروع</span>
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">تعديل المشروع</h1>
          <p className="text-gray-400">قم بتعديل تفاصيل مشروعك</p>
        </div>

        {/* Form Component */}
        <EditProjectPage />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
