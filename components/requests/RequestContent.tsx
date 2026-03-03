import { ReactNode } from "react";
import { Clock } from "lucide-react";

interface RequestContentProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  isLoading?: boolean;
}

export default function RequestContent({ 
  title, 
  subtitle, 
  children, 
  isLoading = false 
}: RequestContentProps) {
  return (
    <div className="flex-1 bg-gray-50 ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
