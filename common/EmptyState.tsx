import React from "react";
import { SearchLargeIcon } from "@/public/icons";

interface EmptyStateProps {
  title?: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({ 
  title = "عذراً، لم نجد نتائج",
  description = "حاول تغيير مهاراتك المختارة أو الكلمات المفتاحية في شريط البحث.",
  className = "",
  icon = <SearchLargeIcon className="w-12 h-12 opacity-90" />
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-24 text-slate-300 font-cairo animate-in fade-in zoom-in duration-700 ${className}`}>
      <div className="w-24 h-24 mb-6 bg-slate-50 rounded-full flex items-center justify-center shadow-inner">
        {icon}
      </div>
      <p className="text-2xl font-black text-slate-800 mb-2">
        {title}
      </p>
      <p className="text-slate-400 font-bold max-w-xs text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
}
