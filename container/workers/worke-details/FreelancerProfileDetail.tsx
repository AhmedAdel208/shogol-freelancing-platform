import { User, Briefcase, Star } from "lucide-react";
import { Worker } from "@/types/workers";
import ProfileCard from "@/container/workers/worke-details/ProfileCard";
import PortfolioSection from "@/container/workers/worke-details/PortofolieSection";
import ReviewsSection from "@/container/workers/worke-details/ReviewsSection";
import Image from "next/image";

interface FreelancerProfileDetailProps {
  data: Worker;
}

export default function FreelancerProfileDetail({ data }: FreelancerProfileDetailProps) {
  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col selection:bg-primary/10">
      {/* Modern Elite Banner */}
      <div className="h-56 md:h-72 bg-linear-to-br from-transparent via-dark/10 to-primary/30 w-full relative overflow-hidden">
        {data.coverImageUrl ? (
          <Image
            src={data.coverImageUrl}
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <>
            {/* Abstract Glassmorphic Patterns */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(28,178,185,0.15),transparent_50%)]" />
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl" />
          </>
        )}
      </div>

      {/* Content Container - Reversing Grid Order (Sidebar Right, Content Left) */}
      <div className="max-w-8xl mx-auto px-6 lg:px-10 w-full -mt-24 md:-mt-32 pb-24 relative z-10" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Profile Sidebar (Right Column in RTL) */}
          <div className="lg:col-span-4 order-1 lg:sticky lg:top-24 space-y-6 animate-in slide-in-from-right-8 duration-700">
            <ProfileCard user={data} />
          </div>

          {/* Main Content (Left Column in RTL) */}
          <div className="lg:col-span-8 space-y-10 order-2">
            
            {/* Bio Section - Refined Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-primary/20 ring-1 ring-slate-100/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
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
                <div className="relative text-slate-600 font-bold font-cairo leading-[1.8] text-[16px] md:text-[17px] bg-slate-50/50 rounded-[30px]  p-2 group-hover:bg-white transition-colors duration-500">
                  {data.bio || "هذا المستقل يفضل العمل في صمت.. لم يتم إضافة نبذة تعريفية بعد."}
                </div>
              </div>
            </div>

            {/* Portfolio Section - Stunning Grid */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-primary/20 ring-1 ring-slate-100/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
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
  );
}
