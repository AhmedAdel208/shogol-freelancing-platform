interface PremiumSkeletonGridProps {
  count?: number;
  className?: string;
}

export default function PremiumSkeletonGrid({
  count = 4,
  className = "",
}: PremiumSkeletonGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-4xl border border-slate-50 p-6 h-60 space-y-4 animate-pulse shadow-sm"
        >
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
  );
}
