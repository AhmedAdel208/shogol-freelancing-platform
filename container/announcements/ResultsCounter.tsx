import { ResultsCounterProps } from "@/types/announcements";

export default function ResultsCounter({
  currentCount,
  totalCount,
}: ResultsCounterProps & { totalCount?: number }) {
  const getArabicLabel = (count: number) => {
    if (count === 0) return "مشاريع";
    if (count === 1) return "مشروع متاح";
    if (count === 2) return "مشروعين متاحين";
    if (count >= 3 && count <= 10) return "مشاريع متاحة";
    return "مشروعاً متاحاً";
  };

  const total = totalCount || currentCount;

  if (total === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center my-6" dir="rtl">
      <div className="bg-white/60 backdrop-blur-xl border border-gray-100/80 px-5 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-2.5 group transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-0.5 cursor-default">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-[14px] font-semibold font-cairo whitespace-nowrap">
            نعرض لك
          </span>
          <div className="flex items-center gap-1.5 bg-primary/5 px-3 py-1.5 rounded-xl border border-primary/10 transition-colors group-hover:bg-primary/10">
            <span className="text-primary font-black text-[15px] font-cairo leading-none">{currentCount}</span>
            {total > currentCount && (
              <>
                <span className="text-primary/60 text-[13px] font-bold font-cairo mx-0.5">من أصل</span>
                <span className="text-primary font-black text-[15px] font-cairo leading-none">{total}</span>
              </>
            )}
          </div>
          <span className="text-gray-700 text-[14px] font-bold font-cairo transition-colors group-hover:text-gray-900">
            {getArabicLabel(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
