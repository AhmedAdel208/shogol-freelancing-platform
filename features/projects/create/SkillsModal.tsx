"use client";

import { X, Check } from "lucide-react";
import { Skill } from "@/types/skills";
import { useEffect, useRef } from "react";

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableSkills: Skill[];
  selectedSkillIds: number[];
  onToggleSkill: (skill: Skill) => void;
  onConfirm: () => void;
}

export default function SkillsModal({
  isOpen,
  onClose,
  availableSkills,
  selectedSkillIds,
  onToggleSkill,
  onConfirm,
}: SkillsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        ref={modalRef}
        className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-gray-400"
          >
            <X size={24} />
          </button>
          <h2 className="text-xl font-black font-cairo text-dark">اختر المهارات</h2>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content - Skills Grid */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableSkills.map((skill) => {
              const isSelected = selectedSkillIds.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => onToggleSkill(skill)}
                  className={`
                    flex items-center justify-end gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-right group
                    ${isSelected 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-gray-100 hover:border-primary/30 hover:bg-gray-50 text-gray-600"}
                  `}
                >
                  <span className={`text-sm font-bold font-cairo line-clamp-1 ${isSelected ? "text-primary" : "text-gray-600"}`}>
                    {skill.nameAr}
                  </span>
                  
                  <div className={`
                    w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0
                    ${isSelected 
                      ? "bg-primary border-primary" 
                      : "border-gray-300 bg-white group-hover:border-primary/50"}
                  `}>
                    {isSelected && <Check size={12} className="text-white" strokeWidth={4} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full py-4 bg-primary text-white rounded-2xl font-black font-cairo text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] cursor-pointer"
          >
            تم
          </button>
        </div>
      </div>
    </div>
  );
}
