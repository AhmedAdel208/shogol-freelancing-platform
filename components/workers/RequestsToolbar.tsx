"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function RequestsToolbar() {
  const [search, setSearch] = useState("");

  return (
    <div dir="rtl" className="w-full bg-white rounded-2xl shadow-sm p-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">

        {/* Filter Button */}
        <button
          className="flex items-center gap-2 border border-cyan-500 text-cyan-600 
                     px-6 py-3 rounded-xl hover:bg-cyan-50 transition"
        >
          <SlidersHorizontal size={18} />
          تصفية
        </button>

        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="ابحث عن مستقل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl py-3 pr-12 pl-4 
                       focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <Search
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

      </div>
    </div>
  );
}