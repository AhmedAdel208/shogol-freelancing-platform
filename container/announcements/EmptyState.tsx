import { EmptyStateProps } from "@/types/announcements";
import SearchIcon from "@/public/icons/SearchIcon";

export default function EmptyState({
  message = "لم يتم العثور على أي مشاريع تطابق بحثك.",
  title = "لا توجد نتائج",
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
          <SearchIcon width={40} height={40} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{message}</p>
      </div>
    </div>
  );
}
