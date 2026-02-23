import { Search, Filter } from "lucide-react";
import { SearchAndFiltersProps } from "@/types/announcements";
import DropdownArrow from "@/public/icons/DropdownArrow";
import { statusOptions } from "@/data/statusOptions";

export default function SearchAndFilters({
  searchTerm,
  minBudget,
  maxBudget,
  status,
  filterShow,
  onSearchChange,
  onFilterChange,
}: SearchAndFiltersProps) {
  return (
    <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 flex flex-col gap-5 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
      {/* Top Row: Button + Search Input */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full relative flex items-center border border-slate-200 rounded-lg overflow-hidden focus-within:ring-primary/20 focus-within:ring-[3px] focus-within:border-primary transition-all">
          <Search className="absolute right-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن مشروع..."
            className="w-full bg-transparent py-3 pr-12 pl-4  focus:outline-none text-slate-700 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filter Button */}
        <button
          type="button"
          onClick={() => onFilterChange("filterShow", !filterShow)}
          className="flex items-center gap-2 border-[1.5px] border-primary bg-[#EEF8F9] text-[#1CB2B9] rounded-lg px-6 py-3 font-bold hover:bg-[#E0F3F4] transition-colors active:scale-95 shrink-0 w-full cursor-pointer sm:w-auto  justify-center"
        >
          <span>تصفية</span>
          <Filter className="w-5 h-5 fill-[currentColor]" />
        </button>
      </div>

      {filterShow && (
        <div>
          {" "}
          {/* Divider */}
          <div className="h-px w-full bg-slate-100 mb-4"></div>
          {/* Bottom Row: 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Min Budget */}
            <div className="flex flex-col gap-2">
              <label className=" text-slate-500 font-medium text-right">
                الحد الأدنى للميزانية
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="0"
                className="w-full  text-right bg-transparent border border-slate-200 rounded-lg py-2.5 px-4  focus:outline-none focus:ring-primary/20 focus:ring-[3px] focus:border-primary transition-all text-slate-700 placeholder:text-slate-400 ltr-input"
                dir="rtl"
                value={minBudget}
                onChange={(e) => onFilterChange("minBudget", e.target.value)}
              />
            </div>

            {/* Max Budget */}
            <div className="flex flex-col gap-2">
              <label className=" text-slate-500 font-medium text-right">
                الحد الأقصى للميزانية
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="10000"
                className="w-full text-right bg-transparent border border-slate-200 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-primary/20 focus:ring-[3px] focus:border-primary transition-all text-slate-700 placeholder:text-slate-400 ltr-input"
                dir="rtl"
                value={maxBudget}
                onChange={(e) => onFilterChange("maxBudget", e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2">
              <label className=" text-slate-500 font-medium text-right">
                الحالة
              </label>
              <div className="relative">
                <select
                  className="w-full bg-transparent border border-slate-200 rounded-lg py-2.5 px-10  focus:outline-none focus:ring-primary/20 focus:ring-[3px] focus:border-primary transition-all text-slate-700 text-right appearance-none"
                  value={status}
                  onChange={(e) => onFilterChange("status", e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <DropdownArrow
                    width={12}
                    height={8}
                    className="text-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
