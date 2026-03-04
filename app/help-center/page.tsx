'use client';
import HelpCategories from "@/components/help-center/HelpCategories";
import HelpCenterLayout from "@/components/help-center/HelpCenterLayout";

import HelpContact from "@/components/help-center/HelpContact";
import HelpFAQ from "@/components/help-center/HelpFAQ";
import HelpHeader from "@/components/help-center/HelpHeader";
import { useState } from "react";

export default function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <HelpCenterLayout>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header Section */}
        <HelpHeader />

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
