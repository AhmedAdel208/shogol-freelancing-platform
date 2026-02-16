"use client";
import { useState } from "react";
import DropdownArrow from "@/public/icons/DropdownArrow";

export default function HeaderSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex items-center border border-[#BEC0C2] rounded-[10px] overflow-hidden focus-within:border-primary transition-colors">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="ابحث هنا"
        className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-400 outline-none bg-transparent"
      />
      {/* Category Dropdown */}
      <div className="flex items-center px-4 py-3 border-r border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
        <span className="text-dark text-base font-medium">المشتغلين</span>
        <DropdownArrow className="w-4 h-4 mr-2 text-dark" />
      </div>
    </div>
  );
}
