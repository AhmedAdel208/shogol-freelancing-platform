import { FileX, Search } from "lucide-react";
import { Button } from "@/container/reusable/form";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function EmptyState({
  title = "لا توجد عروض في هذه الفئة",
  description = "لم يتم العثور على عروض مطابقة للمعايير المحددة",
  buttonText = "تصفح المشاريع",
  onButtonClick,
  icon: Icon = FileX
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {description}
      </p>
      
      {onButtonClick && (
        <Link
          href="/announcements"
          onClick={onButtonClick}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2 space-x-reverse"
        >
          <Search className="w-5 h-5" />
          تصفح المشاريع
        </Link>
      )}
    </div>
  );
}
