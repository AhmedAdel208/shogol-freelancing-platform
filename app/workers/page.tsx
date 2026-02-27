"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userService } from "@/lib/api/user";
import { Freelancer } from "@/types/freelancers";
import { Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import WorkersLayout from "@/components/layout/WorkersLayout";
import RequestsToolbar from "@/components/workers/RequestsToolbar";
// removed placeholder image import


export default function WorkersPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);

  async function loadFreelancers() {
    setLoading(true);
    setError(null);
    const data = await userService.searchFreelancers({});
    setFreelancers(data.freelancers);
    setLoading(false);
  }

  useEffect(() => {
    loadFreelancers();
  }, []);

  return (
    <WorkersLayout>
      <div className="px-4 py-12 max-w-8xl mx-auto relative overflow-hidden" dir="rtl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-teal-400/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

        {/* Page Header */}
        <div className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-top-6 duration-1000">
          <h1 className="text-4xl md:text-5xl font-black font-cairo text-slate-900 tracking-tight">
            تصفح المشتغلين
          </h1>
          <p className="text-lg md:text-xl font-bold font-cairo text-slate-400 max-w-2xl mx-auto leading-relaxed">
            استكشف نخبة من المبدعين والخبراء في مختلف المجالات، ادم.
          </p>
        </div>

        <RequestsToolbar />

        {/* Results Counter Bar */}
        {!loading && !error && freelancers.length > 0 && (
          <div className="mb-8 flex items-center justify-between px-2 animate-in fade-in duration-700">
            <div className="flex items-center gap-2 text-slate-400 font-bold font-cairo">
              <span className="text-primary">{freelancers.length}</span>
              <span className="text-sm">مشتغل متاح حالياً</span>
            </div>
            <div className="h-px flex-1 bg-slate-100 mx-6 hidden sm:block opacity-50" />
            <button 
              onClick={() => loadFreelancers()}
              className="text-xs font-black font-cairo text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              تحديث النتائج
            </button>
          </div>
        )}

        {/* Loading State: Premium Skeleton Grid */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-[32px] border border-slate-50 p-6 h-[240px] space-y-4 animate-pulse shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3 pl-4 pt-2">
                    <div className="h-4 w-3/4 bg-slate-100 rounded-full ml-auto" />
                    <div className="h-3 w-1/2 bg-slate-50 rounded-full ml-auto" />
                    <div className="h-6 w-1/3 bg-slate-100 rounded-full ml-auto" />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-slate-100" />
                </div>
                <div className="h-px w-full bg-slate-50" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-50 rounded-full" />
                  <div className="h-3 w-5/6 bg-slate-50 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="bg-red-50/50 border border-red-100 p-8 rounded-[32px] text-red-500 font-black font-cairo text-center animate-in zoom-in duration-500">
            {error}
            <button 
              onClick={() => loadFreelancers()}
              className="mt-4 block mx-auto bg-white border border-red-200 px-6 py-2 rounded-full text-sm hover:bg-red-50 transition-colors shadow-sm cursor-pointer"
            >
              إعادة المحاولة
            </button>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && !error && freelancers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300 font-cairo animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 mb-6 bg-slate-50 rounded-full flex items-center justify-center shadow-inner">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <p className="text-2xl font-black text-slate-800 mb-2">عذراً، لم نجد نتائج</p>
            <p className="text-slate-400 font-bold max-w-xs text-center leading-relaxed">
              حاول تغيير مهاراتك المختارة أو الكلمات المفتاحية في شريط البحث.
            </p>
          </div>
        )}

        {/* Content State: Animated Grid */}
        {!loading && !error && freelancers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freelancers.map((f, idx) => {
              return (
                <Link
                  key={f.id}
                  href={`/workers/${f.id}`}
                  className="group relative flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-500 p-6 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Top Section: Avatar & Identity (Left-Oriented) */}
                  <div className="flex items-start gap-4 mb-4">
                    {/* Left: Avatar */}
                    <div className="relative shrink-0 w-20 h-20 rounded-full overflow-hidden ring-4 ring-slate-50 shadow-md transition-all duration-700 group-hover:scale-105 group-hover:ring-primary/10 flex items-center justify-center bg-slate-50">
                      {f.profilePictureUrl ? (
                        <Image
                          src={f.profilePictureUrl}
                          alt={f.fullName || "profile"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-black text-primary/80 font-cairo">
                          {f.fullName ? f.fullName.charAt(0).toUpperCase() : "U"}
                        </span>
                      )}
                    </div>

                    {/* Right: Info (Aligned Left) */}
                    <div className="flex flex-col items-start flex-1 pt-2">
                      <h3 className="font-black text-2xl text-slate-800 font-cairo group-hover:text-primary transition-colors mb-1 leading-tight">
                        {f.fullName || "مستخدم"}
                      </h3>
                      
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-slate-400 mb-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <span className="text-sm font-bold font-cairo">{f.nationality || "غير محدد"}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-2 bg-amber-50/50 px-3 py-1 rounded-full border border-amber-100/30">
                         <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < Math.floor(f.rating || 0) ? "#fbbf24" : "none"} stroke="#fbbf24" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            ))}
                         </div>
                         <span className="text-sm font-black text-amber-600 font-cairo">{(f.rating || 0).toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="h-px w-full bg-slate-50 mb-4 opacity-60" />

                  {/* Bio Section */}
                  {f.bio && (
                    <p className="text-[15px] text-slate-500 font-cairo leading-relaxed line-clamp-2 text-left mb-4 min-h-[40px]">
                      {f.bio}
                    </p>
                  )}

                  {/* Skills Section */}
                  {f.skills && f.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4 justify-start">
                      {f.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill.id}
                          className="bg-[#EEF8F9] text-[#1CB2B9] rounded-full px-4 py-1.5 text-[12px] font-black font-cairo transition-all hover:bg-primary hover:text-white cursor-default"
                        >
                          {skill.nameAr}
                        </span>
                      ))}
                      {f.skills.length > 3 && (
                        <span className="bg-slate-50 text-slate-400 rounded-full px-3 py-1.5 text-[11px] font-bold font-cairo">
                          +{f.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Footer Section (Flipped) */}
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-3 text-slate-400 group-hover:text-primary transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        </div>
                        <span className="text-sm font-black font-cairo whitespace-nowrap">{f.completedJobsCount || "0"} مشروع مكتمل</span>
                    </div>

                    <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                       <span className="text-primary font-black font-cairo text-sm flex items-center gap-2">
                         عرض الملف الشخصي
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                       </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </WorkersLayout>
  );
}
