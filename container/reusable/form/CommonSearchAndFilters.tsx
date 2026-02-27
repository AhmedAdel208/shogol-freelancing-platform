"use client";

import { Search, SlidersHorizontal, ChevronDown, LucideIcon } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
}

interface CommonSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterShow: boolean;
  onFilterToggle: (show: boolean) => void;
  placeholder?: string;
  children?: React.ReactNode; // For custom filter inputs (budget, categories, etc.)
}

export default function CommonSearchAndFilters({
  searchTerm,
  onSearchChange,
  filterShow,
  onFilterToggle,
  placeholder = "ابحث عن ما تريد...",
  children,
}: CommonSearchAndFiltersProps) {
  return (
    <div className="w-full space-y-4" dir="rtl">
      {/* Main Search Bar - Calm Glassmorphism */}
      <div className="group relative flex flex-col sm:flex-row items-stretch gap-3">
        <div className="relative flex-1">
          {/* Active Glow Effect */}
          <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center bg-white/80 backdrop-blur-md border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] group-focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group-focus-within:border-primary/20 transition-all duration-300 overflow-hidden">
            <Search className="absolute right-5 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder={placeholder}
              className="w-full bg-transparent py-4 pr-14 pl-6 focus:outline-none text-slate-700 font-cairo text-lg placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Calm Filter Toggle */}
        <button
          type="button"
          onClick={() => onFilterToggle(!filterShow)}
          className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold font-cairo text-lg transition-all duration-300 active:scale-95 cursor-pointer border
            ${filterShow 
              ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
              : 'bg-white text-slate-600 border-slate-100 hover:border-primary/30 hover:bg-primary/5 shadow-sm'
            }`}
        >
          <span className="mb-px font-bold">تصفية</span>
          <SlidersHorizontal size={20} className={filterShow ? "text-white" : "text-primary"} />
        </button>
      </div>

      {/* Expanded Filters - Calm Reveal */}
      <div className={`grid transition-all duration-500 ease-in-out ${filterShow ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
        <div className="overflow-hidden">
          <div className="bg-white/40 backdrop-blur-sm border border-slate-100/50 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Sub-components for consistency
export const FilterField = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2.5">
    <label className="block text-slate-500 font-bold font-cairo text-sm mr-1 text-right">
      {label}
    </label>
    <div className="relative group/field">
      {children}
    </div>
  </div>
);

export const FilterInput = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement> & { unit?: string }) => (
  <>
    <input
      {...props}
      className={`w-full text-right bg-white border border-slate-100 rounded-xl py-3 px-5 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-slate-700 font-cairo shadow-xs ${props.className}`}
    />
    {props.unit && (
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-bold font-cairo">
        {props.unit}
      </span>
    )}
  </>
);

export const FilterSelect = ({ options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: any[] | readonly any[] }) => (
  <>
    <select
      {...props}
      className={`w-full bg-white border border-slate-100 rounded-xl py-3 px-10 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-slate-700 font-bold font-cairo text-right appearance-none shadow-xs cursor-pointer ${props.className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within/field:rotate-180 transition-transform" size={18} />
  </>
);
