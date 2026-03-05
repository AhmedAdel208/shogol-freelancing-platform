import { ResultsCounterProps } from "@/types/announcements";

export default function ResultsCounter({
  currentCount,
  totalCount,
  label = "مشروع",
}: ResultsCounterProps & { totalCount?: number }) {
  const getArabicLabel = (count: number) => {
    if (count === 1) return "مشروع";
    if (count === 2) return "مشروعان";
    if (count >= 3 && count <= 10) return "مشاريع";
    return "مشروع";
  };

  return (
    <div className="flex items-center justify-center py-6" dir="rtl">
      <div className="bg-white/40 backdrop-blur-md border border-gray-100/50 px-8 py-2.5 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] flex items-center gap-3 group transition-all hover:bg-white hover:shadow-lg">
        <span className="text-gray-400 text-[13px] font-bold font-cairo">عرض</span>
        <div className="flex items-center gap-1.5 bg-primary/5 px-2 rounded-lg">
           <span className="text-primary font-black text-sm font-cairo">{currentCount}</span>
           <span className="text-gray-400 text-[13px] font-bold font-cairo">من</span>
           <span className="text-gray-800 font-black text-sm font-cairo">{totalCount || currentCount}</span>
        </div>
        <span className="text-gray-600 text-[13px] font-black font-cairo opacity-70 group-hover:opacity-100 transition-opacity">
           {getArabicLabel(totalCount || currentCount)}
        </span>
      </div>
    </div>
  );
}
