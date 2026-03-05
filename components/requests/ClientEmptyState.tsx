import { Briefcase, Plus } from "lucide-react";
import Link from "next/link";

interface ClientEmptyStateProps {
  onCreateProject?: () => void;
}

export default function ClientEmptyState({ onCreateProject }: ClientEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm">
      <div className="w-28 h-28 bg-gray-50 rounded-3xl flex items-center justify-center mb-10 shadow-inner">
        <Briefcase className="w-14 h-14 text-gray-300" />
      </div>
      
      <h3 className="text-2xl font-black text-gray-900 mb-4 text-center tracking-tight">
        لا توجد طلبات
      </h3>
      
      <p className="text-gray-500 text-center mb-12 max-w-sm font-medium leading-relaxed">
        لم تقم بإنشاء أي طلبات عمل بعد. ابدأ بإنشاء طلب جديد للعثور على المستقلين المناسبين لمشروعك.
      </p>
      
      <Link
        href="/projects/create"
        onClick={onCreateProject}
        className="inline-flex items-center gap-3 bg-[#00b5bc] hover:bg-[#00a3a9] text-white px-12 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl shadow-[#00b5bc]/20 hover:scale-105 active:scale-95"
      >
        <Plus className="w-6 h-6" />
        إنشاء طلب جديد
      </Link>
    </div>
  );
}
