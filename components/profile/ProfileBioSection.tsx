

import { Edit2, FileText } from "lucide-react";

interface ProfileBioSectionProps {
  bio?: string;
}

export default function ProfileBioSection({ bio }: ProfileBioSectionProps) {
  return (
    <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <FileText size={20} />
          </div>
          السيرة الذاتية
        </h2>
        <button className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-black text-sm hover:bg-primary hover:text-white transition-all active:scale-[0.98]">
          <Edit2 size={16} />
          تعديل
        </button>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
        {bio ? (
          <p className="text-slate-600 font-bold leading-relaxed text-sm whitespace-pre-line">
            {bio}
          </p>
        ) : (
          <p className="text-slate-400 text-center text-sm font-bold w-full py-4 border-dashed border border-slate-200 rounded-xl">
            أضف نبذة تعريفية عنك لتزيد من فرص حصولك على مشاريع
          </p>
        )}
      </div>
    </section>
  );
}
