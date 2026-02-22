"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { services } from "@/data/mockDataServiceSection";
import AnnouncementCard from "./AnnouncementCard";
import Sidebar from "./Sidebar";
import SearchHeader from "../landing/header/SearchHeader";

export default function AnnouncementsSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Extract unique badges for filtering
  const badges = [...new Set(services.map((service) => service.badge))];

  // Map parent categories to their subcategories
  const categoryMap: { [key: string]: string[] } = {
    برمجه: ["ويب", "تصميم مواقع", "انشاء موقع الكتروني"],
  };

  // Filter services based on search term and selected fields
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.includes(searchTerm) ||
      service.description.includes(searchTerm) ||
      service.author.includes(searchTerm);

    // Check if service matches selected fields
    let matchesFields = true;

    if (selectedFields.length > 0) {
      matchesFields = selectedFields.some((field) => {
        // If field is a parent category, check if service badge is in its subcategories
        if (categoryMap[field]) {
          return categoryMap[field].includes(service.badge);
        }
        // If field is a subcategory, check direct match
        return service.badge === field;
      });
    }

    return matchesSearch && matchesFields;
  });

  return (
    <section className=" px-4  max-w-full mx-auto min-h-screen">
        <SearchHeader/>
      {/* Section Header */}
      <div className="mb-12 max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-bg rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-dark" />
          </button>
          {/* <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-dark text-right mb-4">
              الاعلانات
            </h1>
            <p className="text-lg text-gray-medium text-right">
              استعرض جميع الاعلانات والخدمات المتاحة
            </p>
          </div> */}
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex gap-6 max-w-8xl mx-auto">
        {/* Sidebar */}
        <Sidebar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedFields={selectedFields}
          onFieldsChange={setSelectedFields}
          badges={badges}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-right text-gray-medium text-sm">
              تم العثور على {filteredServices.length} نتيجة
            </p>
          </div>

          {/* Announcements List */}
          {filteredServices.length > 0 ? (
            <div className="flex flex-col gap-0">
              {filteredServices.map((service) => (
                <AnnouncementCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-medium">لم يتم العثور على نتائج</p>
              <p className="text-gray-light mt-2">
                حاول تغيير معايير البحث والفلترة
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
