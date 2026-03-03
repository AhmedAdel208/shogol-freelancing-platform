
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { Skill } from "@/types/skills";

interface ProfileSkillsSectionProps {
  skills: Skill[];
  isLoading: boolean;
}

export default function ProfileSkillsSection({ skills, isLoading }: ProfileSkillsSectionProps) {
  return (
    <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
            <Briefcase size={20} />
          </div>
          المهارات
        </h2>
        <button className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
          <Plus size={16} />
          إضافة مهارة
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-3">
        {isLoading ? (
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-8 bg-slate-100 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : skills && skills.length > 0 ? (
          skills.map((skill, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-sm hover:border-rose-200 hover:bg-rose-50/50 transition-colors"
            >
              <span>{ (skill.nameAr || "") + " / " + (skill.nameEn || "") }</span>
              <button className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer">
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm font-bold w-full text-center py-4 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
            لم تقم بإضافة أي مهارات بعد. أضف مهاراتك لتبرز ملفك للعملاء.
          </p>
        )}
      </div>
    </section>
  );
}
