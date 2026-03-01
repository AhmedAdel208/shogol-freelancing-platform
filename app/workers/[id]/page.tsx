"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PortfolioSection from "@/components/workers/profileSection";
import ReviewsSection from "@/components/workers/ReviewsSection";
import { userService } from "@/lib/api/user";
import { Worker } from "@/types/workers";
import ProfileCard from "@/components/workers/ProfileCard";
import WorkersLayout from "@/components/layout/WorkersLayout";
import { User, Briefcase, Star, Info } from "lucide-react";
import Loading from "@/common/Loading";

export default function ProfilePage() {
  const { id } = useParams();

  const [data, setData] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProfile() {
    setLoading(true);
    setError(null);

    try {
      const response: Worker = await userService.getAccountDetails({
        id: String(id),
      });
      setData(response);
    } catch (err: any) {
      setError(err.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [id]);

  if (loading) return <Loading />;
  
  if (error || !data) {
    return (
      <WorkersLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center p-10 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-md mx-auto">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <Info size={32} />
            </div>
            <h2 className="text-xl font-black text-slate-800 font-cairo mb-2">
              {error ? "حدث خطأ ما" : "المستقل غير موجود"}
            </h2>
            <p className="text-slate-500 font-bold font-cairo">{error || "عذراً، لم نتمكن من العثور على ملف هذا المستقل."}</p>
          </div>
        </div>
      </WorkersLayout>
    );
  }

  return (
    <WorkersLayout>
      <div className="min-h-screen bg-slate-50/40 flex flex-col selection:bg-primary/10">
        {/* Modern Elite Banner */}
        <div className="h-56 md:h-72 bg-linear-to-br from-slate-900 via-primary/80 to-indigo-600 w-full relative overflow-hidden">
           {/* Abstract Glassmorphic Patterns */}
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(28,178,185,0.15),transparent_50%)]" />
           <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
           <div className="absolute bottom-10 left-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl" />
        </div>

        {/* Content Container - Reversing Grid Order (Sidebar Right, Content Left) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full -mt-24 md:-mt-32 pb-24 relative z-10" dir="rtl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Profile Sidebar (Right Column in RTL) */}
            <div className="lg:col-span-4 order-1 lg:sticky lg:top-24 space-y-6 animate-in slide-in-from-right-8 duration-700">
              <ProfileCard user={data} />
            </div>

            {/* Main Content (Left Column in RTL) */}
            <div className="lg:col-span-8 space-y-10 order-2">
              
              {/* Bio Section - Refined Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-white/40 ring-1 ring-slate-100/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
                       <User size={26} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 font-cairo tracking-tight">نبذة عني</h3>
                  </div>
                </div>
                
                <div className="relative group">
                   <div className="absolute -inset-1 bg-linear-to-r from-primary/5 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="relative text-slate-600 font-bold font-cairo leading-[1.8] text-[16px] md:text-[17px] bg-slate-50/50 p-8 rounded-[30px] border border-slate-100/80 shadow-inner group-hover:bg-white transition-colors duration-500">
                      {data.bio || "هذا المستقل يفضل العمل في صمت.. لم يتم إضافة نبذة تعريفية بعد."}
                   </div>
                </div>
              </div>

              {/* Portfolio Section - Stunning Grid */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-white/40 ring-1 ring-slate-100/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
                       <Briefcase size={26} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 font-cairo tracking-tight">معرض الأعمال</h3>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                     <span className="text-[13px] font-black text-slate-400 font-cairo">إجمالي الأعمال:</span>
                     <span className="text-sm font-black text-primary">{data.portfolios?.length || 0}</span>
                  </div>
                </div>
                
                <PortfolioSection portfolio={data.portfolios || []} />
              </div>

              {/* Reviews Section - Premium Design */}
              <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-white/40 ring-1 ring-slate-100/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-inner">
                     <Star size={26} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 font-cairo tracking-tight">التقييمات والآراء</h3>
                </div>
                
                <ReviewsSection reviews={data.reviews || []} />
              </div>
            </div>

          </div>
        </div>

        {/* Floating Mobile Action (New) */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 lg:hidden z-50">
           <button className="bg-slate-900 text-white px-10 py-5 rounded-full font-black font-cairo text-lg shadow-2xl flex items-center gap-3 animate-bounce shadow-primary/40 active:scale-95 transition-all">
              تواصل مع المستقل
              <User size={20} />
           </button>
        </div>
      </div>
    </WorkersLayout>
  );
}
