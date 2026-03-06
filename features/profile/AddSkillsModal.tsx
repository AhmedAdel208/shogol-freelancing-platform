

import { useState, useMemo } from "react";
import { X, ChevronDown, Check, Loader2, Search } from "lucide-react";
import { useAllSkills, useUserSkills, useAddSkills } from "@/hooks/profile/useSkills";
import {  UserSkill } from "@/types/skills";


interface AddSkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddSkillsModal({ isOpen, onClose }: AddSkillsModalProps) {
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");


  const { data: allSkillsData, isLoading: isAllSkillsLoading } = useAllSkills(isOpen);
  const { data: userSkillsData } = useUserSkills(isOpen);

  const categories = allSkillsData?.categories || [];
  const existingSkillIds = useMemo(() => {
    const list = userSkillsData?.skills || [];
    return list.map((s: UserSkill) => s.skillId);
  }, [userSkillsData]);

  const addMutation = useAddSkills(() => {
    onClose();
    setSelectedSkillIds([]);
  });

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSkill = (id: number) => {
    setSelectedSkillIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    return categories.map(cat => ({
      ...cat,
      skills: cat.skills.filter(s => 
        s.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.skills.length > 0);
  }, [categories, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
      {/* Overlay - now uses fixed inset-0 to ensure it covers everything regardless of parent */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content - relative to ensure it stays above the overlay */}
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900 font-cairo">إضافة مهارات جديدة</h3>
            <p className="text-sm text-slate-500 font-bold font-cairo mt-1">
              المهارات المحددة: <span className="text-primary">{selectedSkillIds.length}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-100 px-6">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text"
              placeholder="ابحث عن مهارة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pr-12 pl-4 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-bold transition-all"
            />
          </div>
        </div>

        {/* Skills List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
          {isAllSkillsLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="animate-spin text-primary" size={40} />
              <p className="font-bold text-slate-500">جاري تحميل المهارات...</p>
            </div>
          ) : filteredCategories.length > 0 ? (
            filteredCategories.map((category: any) => (
              <div key={category.id} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/30">
                <button 
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-800 font-cairo">{category.nameAr}</span>
                    <span className="bg-slate-100 text-slate-500 text-[11px] px-2 py-0.5 rounded-full font-bold">
                      {category.skills.length}
                    </span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-slate-400 transition-transform duration-300 ${expandedCategories.includes(category.id) ? "rotate-180" : ""}`} 
                  />
                </button>

                {expandedCategories.includes(category.id) && (
                  <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-2 animate-in slide-in-from-top-2 duration-300">
                    {category.skills.map((skill: any) => {
                      const isExisting = existingSkillIds.includes(skill.id);
                      const isSelected = selectedSkillIds.includes(skill.id);
                      
                      return (
                        <button
                          key={skill.id}
                          disabled={isExisting}
                          onClick={() => toggleSkill(skill.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-right transition-all group ${
                            isExisting 
                              ? "bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed" 
                              : isSelected
                                ? "bg-primary/5 border-primary text-primary"
                                : "bg-white border-slate-100 hover:border-primary/30"
                          }`}
                        >
                          <span className="text-sm font-bold flex-1">{skill.nameAr}</span>
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            isExisting || isSelected 
                              ? "bg-primary border-primary text-white" 
                              : "border-slate-200 group-hover:border-primary"
                          }`}>
                            {(isExisting || isSelected) && <Check size={14} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Search size={40} className="mb-4 opacity-20" />
              <p className="font-bold">لم نجد مهارات تطابق بحثك</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-4 bg-slate-50/50">
          <button 
            disabled={selectedSkillIds.length === 0 || addMutation.isPending}
            onClick={() => addMutation.mutate(selectedSkillIds)}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-black font-cairo hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2"
          >
            {addMutation.isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>إضافة {selectedSkillIds.length} مهارات</span>
              </>
            )}
          </button>
          <button 
             onClick={onClose}
             className="px-8 bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-black font-cairo hover:bg-slate-50 transition-all"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
}
