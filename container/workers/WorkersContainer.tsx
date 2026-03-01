import Image from "next/image";
import Link from "next/link";
import RequestsToolbar from "@/components/workers/RequestsToolbar";
import { LocationIcon, StarIcon, WorkIcon, ArrowIcon } from "@/public/icons";
import { WorkersContainerProps } from "@/types/workersContainer";
import PremiumSkeletonGrid from "@/common/PremiumSkeletonGrid";
import EmptyState from "@/common/EmptyState";
import ErrorState from "@/common/ErrorState";
import { CheckCircle2 } from "lucide-react";

export default function WorkersContainer({
  freelancers,
  totalCount,
  isLoading,
  error,
  refetch,
  searchParams,
  setSearchParams,
}: WorkersContainerProps) {
  return (
    <div
      className="px-4 py-12 max-w-8xl mx-auto relative overflow-hidden"
      dir="rtl"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-teal-400/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

      {/* Page Header */}
      <div className="mb-12 text-center space-y-4 animate-in fade-in slide-in-from-top-6 duration-1000">
        <h1 className="text-2xl md:text-3xl font-black font-cairo text-dark tracking-tight mb-6">
          تصفح المشتغلين
        </h1>
        <p className="text-lg font-bold font-cairo text-slate-400 max-w-2xl mx-auto leading-relaxed">
          استكشف نخبة من المبدعين والخبراء في مختلف المجالات،
        </p>
      </div>

      <RequestsToolbar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Results Counter Bar */}
      {!isLoading && !error && freelancers.length > 0 && (
        <div className="mb-8 flex items-center justify-between px-2 animate-in fade-in duration-700">
          <div className="flex items-center gap-2 text-slate-400 font-bold font-cairo">
            <span className="text-primary">{totalCount}</span>
            <span className="text-sm">مشتغل متاح حالياً</span>
          </div>
          <div className="h-px flex-1 bg-slate-100 mx-6 hidden sm:block opacity-50" />
          <button
            onClick={() => refetch()}
            className="text-xs font-black font-cairo text-primary hover:bg-primary/5 px-4 py-2 rounded-full transition-colors cursor-pointer"
          >
            تحديث النتائج
          </button>
        </div>
      )}

      {/* Loading State: Premium Skeleton Grid */}
      {isLoading && <PremiumSkeletonGrid count={4} />}

      {/* Error State */}
      {error && (
        <ErrorState message="حدث خطأ في تحميل البيانات" onRetry={refetch} />
      )}

      {/* Empty State */}
      {!isLoading && !error && freelancers.length === 0 && <EmptyState />}

      {/* Content State: Animated Grid */}
      {!isLoading && !error && freelancers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((f, idx) => {
            return (
              <Link
                key={f.id}
                href={`/workers/${f.id}`}
                className="group relative flex flex-col bg-white rounded-4xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-500 p-6 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
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
                    <div className="flex items-center gap-2 group/title">
                      <h3 className="font-black text-2xl text-slate-800 font-cairo  mb-1 leading-tight">
                        {f.fullName || "مستخدم"}
                      </h3>
                      {f.rating >= 4.9 && (
                        <div className="bg-primary text-white p-0.5 rounded-full ring-2 ring-emerald-50 transition-transform  mb-1">
                          <CheckCircle2 size={12} strokeWidth={4} />
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-slate-400 mb-3">
                      <LocationIcon className="w-3.5 h-3.5" />
                      <span className="text-sm font-bold font-cairo">
                        {f.nationality || "غير محدد"}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2 bg-amber-50/50 px-3 py-1 rounded-full border border-amber-100/30">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="w-3 h-3"
                            filled={i < Math.floor(f.rating || 0)}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-black text-amber-600 font-cairo">
                        {(f.rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-slate-50 mb-4 opacity-60" />

                {/* Bio Section */}
                {f.bio && (
                  <p className="text-[15px] text-slate-500 font-cairo leading-relaxed line-clamp-2 text-left mb-4 min-h-10">
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
                      <WorkIcon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-sm font-black font-cairo whitespace-nowrap">
                      {f.completedJobsCount || "0"} مشروع مكتمل
                    </span>
                  </div>

                  <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <span className="text-primary font-black font-cairo text-sm flex items-center gap-2">
                      عرض الملف الشخصي
                      <ArrowIcon className="w-4.5 h-4.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
