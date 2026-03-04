'use client';
import HelpCategories from "@/components/help-center/HelpCategories";
import HelpCenterLayout from "@/components/help-center/HelpCenterLayout";

import HelpContact from "@/components/help-center/HelpContact";
import HelpFAQ from "@/components/help-center/HelpFAQ";
import HelpHeader from "@/components/help-center/HelpHeader";
import { useState } from "react";
import Link from "next/link";
import { Home, ChevronLeft } from "lucide-react";

export default function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <HelpCenterLayout>
      <div className="min-h-screen bg-transparent text-white relative">
        {/* Header Section */}
        <HelpHeader />

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <nav className="flex items-center gap-2 text-gray-400 text-sm bg-gray-900/40 w-fit px-4 py-2 rounded-full border border-gray-800 backdrop-blur-md shadow-lg">
            <Link href="/" className="hover:text-primary flex items-center gap-2 transition-colors">
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-600" />
            <span className="text-primary font-medium">مركز المساعدة</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Categories Section */}
            <div className="lg:col-span-2">
              <HelpCategories onCategorySelect={handleCategorySelect} />
            </div>

            {/* FAQ Section */}
            <div className="lg:col-span-1">
              <HelpFAQ selectedCategory={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
    </HelpCenterLayout>
  );
}
