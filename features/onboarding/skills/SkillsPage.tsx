"use client";

import { ChevronDown, Check, Loader2, Search, X } from "lucide-react";
import { useSkills } from "@/hooks/onboarding/useSkills";
import { SkillCategory, Skill } from "@/types/skills";

export default function SkillsPage() {
  const {
    categories,
    selectedSkillIds,
    expandedCategoryId,
    searchQuery,
    setSearchQuery,
    isLoading,
    isSubmitting,
    toggleSkill,
    toggleCategory,
    handleNext,
    error,
  } = useSkills();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col items-center gap-4 max-w-md text-center">
          <p className="text-red-600 font-bold" dir="rtl">
            عذراً، حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Loader2 className="w-12 h-12 text-[#1eaaad] animate-spin" />
        <p
          className="text-gray-500 font-medium text-lg animate-pulse"
          dir="rtl"
        >
          جاري تحميل المهارات...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 font-sans"
      dir="rtl"
    >
      {/* Header Section */}
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1eaaad] tracking-wide">
          اختر مهاراتك
        </h1>
        <p className="text-gray-500 text-lg font-medium max-w-xl mx-auto">
          حدد المهارات التي تتقنها لمساعدة العملاء في العثور عليك بسهولة بناءً
          على تخصصك
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-2xl mb-12 relative group">
        <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#1eaaad] transition-colors" />
        </div>
        <input
          type="text"
          placeholder="ابحث عن مهارة أو فئة بمهولة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-4 pr-14 pl-12 bg-white rounded-2xl shadow-sm border-2 border-transparent focus:border-[#1eaaad]/30 focus:ring-4 focus:ring-[#1eaaad]/5 outline-none transition-all text-dark font-bold text-lg placeholder:text-gray-300 placeholder:font-medium"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 left-0 pl-4 flex items-center hover:text-red-500 text-gray-400 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden mb-12 border border-gray-100">
        {/* Card Header (Stats) */}
        <div className="bg-[#F8FAFF] px-8 py-6 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center min-w-[32px] h-8 px-2 rounded-full bg-[#1eaaad] text-white text-sm font-bold shadow-md shadow-[#1eaaad]/20">
              {selectedSkillIds.length}
            </div>
            <span className="text-gray-400 text-sm font-medium">
              مهارة مختارة
            </span>
          </div>

          <span className="text-dark font-extrabold text-lg">
            {searchQuery ? "نتائج البحث" : "فئات المهارات المتاحة"}
          </span>
        </div>

        {/* Categories List Container */}
        <div className="p-8 space-y-4">
          {categories.length > 0 ? (
            categories.map((category: SkillCategory) => {
              // Automatically expand categories if searching
              const isExpanded = searchQuery
                ? true
                : expandedCategoryId === category.id;
              const selectedInCategory = category.skills.filter((s: Skill) =>
                selectedSkillIds.includes(s.id),
              ).length;

              return (
                <div
                  key={category.id}
                  className={`
                    border-2 rounded-2xl overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-2
                    ${isExpanded ? "border-[#1eaaad]/30 shadow-lg shadow-[#1eaaad]/5" : "border-gray-50 hover:border-gray-100 hover:bg-gray-50/50"}
                  `}
                >
                  {/* Category Header */}
                  <div
                    onClick={() => toggleCategory(category.id)}
                    className={`
                      group flex justify-between items-center p-6 cursor-pointer transition-all duration-300
                      ${isExpanded ? "bg-[#F8FAFF]" : "bg-white"}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xl font-bold transition-colors select-none ${isExpanded ? "text-[#1eaaad]" : "text-gray-700"}`}
                      >
                        {category.nameAr}
                      </span>

                      {selectedInCategory > 0 && (
                        <div className="bg-[#1eaaad] text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                          {selectedInCategory}
                        </div>
                      )}

                      {!searchQuery && (
                        <ChevronDown
                          size={20}
                          className={`text-gray-400 transition-transform duration-500 ${isExpanded ? "rotate-180 text-[#1eaaad]" : "group-hover:text-gray-600"}`}
                        />
                      )}
                    </div>

                    <span
                      className={`text-sm font-bold italic tracking-wide transition-colors select-none ${isExpanded ? "text-[#1eaaad]" : "text-gray-300"}`}
                      dir="ltr"
                    >
                      {category.nameEn}
                    </span>
                  </div>

                  {/* Skills Grid (Visible when expanded) */}
                  {isExpanded && (
                    <div className="p-6 bg-white border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.skills.map((skill: Skill) => {
                          const isSkillSelected = selectedSkillIds.includes(
                            skill.id,
                          );
                          return (
                            <div
                              key={skill.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSkill(skill.id);
                              }}
                              className={`
                                group/skill flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border-2
                                ${
                                  isSkillSelected
                                    ? "bg-[#1eaaad]/5 border-[#1eaaad] shadow-sm"
                                    : "bg-white border-transparent hover:border-gray-100 hover:bg-gray-50"
                                }
                              `}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`
                                  w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                                  ${
                                    isSkillSelected
                                      ? "bg-[#1eaaad] border-[#1eaaad] rotate-[360deg]"
                                      : "bg-white border-gray-200 group-hover/skill:border-[#1eaaad]/40"
                                  }
                                `}
                                >
                                  <Check
                                    size={14}
                                    className={`text-white transition-opacity ${isSkillSelected ? "opacity-100" : "opacity-0"}`}
                                    strokeWidth={4}
                                  />
                                </div>
                                <span
                                  className={`text-[15px] font-bold transition-colors ${isSkillSelected ? "text-dark" : "text-gray-600"}`}
                                >
                                  {skill.nameAr}
                                </span>
                              </div>

                              <span
                                className={`text-[10px] font-bold italic transition-colors ${isSkillSelected ? "text-[#1eaaad]" : "text-gray-400"}`}
                                dir="ltr"
                              >
                                {skill.nameEn}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <Search size={40} className="text-gray-200" />
              </div>
              <p className="text-gray-500 font-bold text-xl">
                لا توجد مهارات تطابق بحثك
              </p>
              <p className="text-gray-400 font-medium">
                حاول البحث بكلمات أخرى أو تصفح الفئات
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 px-6 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                مسح البحث
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Button & Helper Text */}
      <div className="w-full max-w-sm mx-auto space-y-6">
        <button
          onClick={handleNext}
          disabled={isSubmitting || selectedSkillIds.length === 0}
          className="relative w-full py-5 bg-[#1eaaad] text-white rounded-2xl font-black text-xl shadow-2xl shadow-[#1eaaad]/30 
            hover:shadow-[#1eaaad]/50 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] 
            transition-all duration-300 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          {isSubmitting && <Loader2 className="w-7 h-7 animate-spin" />}
          <span>
            {isSubmitting ? "جاري الحفظ..." : "التالي: إضافة السيرة الذاتية"}
          </span>
        </button>
      </div>
    </div>
  );
}
