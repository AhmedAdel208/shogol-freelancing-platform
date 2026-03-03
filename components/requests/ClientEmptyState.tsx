import { Briefcase, Plus } from "lucide-react";

interface ClientEmptyStateProps {
  onCreateProject?: () => void;
}

export default function ClientEmptyState({ onCreateProject }: ClientEmptyStateProps) {
  return (
    <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <Briefcase className="w-12 h-12 text-blue-600" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد طلبات</h3>
      <p className="text-gray-600 mb-6">
        لم تقم بإنشاء أي طلبات عمل بعد. ابدأ بإنشاء طلب جديد للعثور على المستقلين المناسبين لمشروعك.
      </p>
      
      <button
        onClick={onCreateProject || (() => window.location.href = '/projects/create')}
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
      >
        <Plus className="w-5 h-5" />
        إنشاء طلب جديد
      </button>
    </div>
  );
}
