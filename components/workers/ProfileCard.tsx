import { Worker } from "@/types/workers";
import { SkillCategory } from "@/types/skills";
import { Calendar, MapPin, Star, MessageCircle, Link, Clock, CheckCircle2, Award } from "lucide-react";
import Image from "next/image";

export default function ProfileCard({ user }: { user: Worker }) {
  const isOnline = !!user.lastOnlineAt;
  
  return (
    <div className="bg-white rounded-[40px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 p-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
      
      {/* Top Identity Section */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Elite Avatar Design */}
        <div className="relative group/avatar">
          <div className="absolute -inset-3 bg-linear-to-tr from-primary/20 via-primary/5 to-transparent rounded-full blur-md opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-700" />
          
          <div className="w-[140px] h-[140px] relative bg-white rounded-full flex items-center justify-center shrink-0 ring-[6px] ring-slate-50 shadow-2xl shadow-slate-200/50 z-10 overflow-hidden">
             <div className="absolute inset-0 border-4 border-white rounded-full z-20 pointer-events-none" />
             {user.profilePictureUrl ? (
               <Image
                 src={user.profilePictureUrl}
                 alt={user.fullName || "User"}
                 width={140}
                 height={140}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
               />
             ) : (
               <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                 <span className="text-slate-300 font-black text-5xl font-cairo">
                   {user.fullName?.charAt(0).toUpperCase()}
                 </span>
               </div>
             )}
          </div>
          
          {/* Online Indicator */}
          <div className="absolute bottom-2 left-2 w-7 h-7 z-30 ring-4 ring-white rounded-full">
             <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20" />
             <div className="relative w-full h-full bg-emerald-500 rounded-full shadow-sm" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-black text-slate-900 font-cairo tracking-tight">
              {user.fullName}
            </h2>
            {user.averageRating >= 4.9 && (
              <div className="bg-emerald-500 text-white p-0.5 rounded-full shadow-lg shadow-emerald-200 ring-2 ring-emerald-100 group-hover:scale-110 transition-transform">
                <CheckCircle2 size={16} strokeWidth={3} />
              </div>
            )}
          </div>
          <p className="text-primary font-black font-cairo text-sm bg-primary/5 px-4 py-1 rounded-full">
            {user.skillCategories?.[0]?.nameEn || "مستقل"}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
           <div className="flex items-center gap-1.5 text-amber-400">
             {[1, 2, 3, 4, 5].map((s) => (
               <Star key={s} size={18} fill={s <= Math.round(user.averageRating || 0) ? "currentColor" : "none"} className={s > Math.round(user.averageRating || 0) ? "text-slate-200" : ""} />
             ))}
           </div>
           <p className="text-slate-400 font-bold font-cairo text-sm">
             ({user.averageRating?.toFixed(1) || "5.0"}) تقييمات العملاء
           </p>
        </div>
      </div>

      {/* Hero Stats Row */}
      <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50">
        <div className="text-center space-y-1 group">
           <p className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">100%</p>
           <p className="text-xs font-black text-slate-400 font-cairo">نسبة الإنجاز</p>
        </div>
        <div className="text-center space-y-1 border-r border-slate-50 group">
           <p className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">{user.completedJobsCount || 0}</p>
           <p className="text-xs font-black text-slate-400 font-cairo">مشاريع مكتملة</p>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="space-y-3">
         <button className="w-full bg-primary text-white py-4.5 rounded-[20px] font-black font-cairo text-base shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 group/btn cursor-pointer">
            <MessageCircle size={20} className="group-hover/btn:rotate-12 transition-transform" />
            تواصل معي
         </button>
         
         <button className="w-full bg-white border-2 border-slate-100 text-slate-600 py-4.5 rounded-[20px] font-black font-cairo text-base hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer group/copy">
            <Link size={18} className="group-hover/copy:rotate-45 transition-transform" />
            نسخ الرابط
         </button>
      </div>

      {/* Metadata Attributes */}
      <div className="space-y-5 pt-4">
        {[
          { icon: <MapPin size={18} />, label: "الموقع", value: user.address || "مصر" },
          { icon: <Calendar size={18} />, label: "انضم منذ", value: "فبراير 2026" },
          { icon: <Clock size={18} />, label: "أخر ظهور", value: "قبل قليل" },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between text-slate-500 group">
             <div className="flex items-center gap-2.5">
                <div className="text-slate-400 group-hover:text-primary transition-colors">
                   {item.icon}
                </div>
                <span className="text-xs font-black font-cairo">{item.label}</span>
             </div>
             <span className="text-sm font-black text-slate-700 font-cairo">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Expert Skills Section */}
      <div className="pt-6 space-y-4">
        <label className="flex items-center gap-2 text-slate-800 font-black font-cairo text-sm">
           <Award size={18} className="text-primary/60" />
           المهارات
        </label>
        <div className="flex flex-wrap gap-2.5">
          {user.skillCategories?.flatMap(cat => cat.skills).map((skill, j) => (
            <span
              key={j}
              className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-[12px] font-black font-cairo border border-slate-100 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all cursor-default"
            >
              {skill.nameEn}
            </span>
          ))}
          {!user.skillCategories?.length && (
            <span className="text-slate-400 text-xs font-bold font-cairo">لم يتم تحديد مهارات بعد.</span>
          )}
        </div>
      </div>
    </div>
  );
}
