import { LucideIcon, Briefcase } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: LucideIcon;
  buttonIcon?: LucideIcon;
  href?: string;
}

export default function EmptyState({
  title = "لا توجد عروض في هذه الفئة",
  description = "لم يتم العثور على عروض مطابقة للمعايير المحددة",
  buttonText = "تصفح المشاريع",
  onButtonClick,
  icon: Icon = Briefcase,
  buttonIcon: ButtonIcon,
  href = "/announcements",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white/50 shadow-xs">
      <div className="w-28 h-28 bg-gray-100 rounded-3xl flex items-center justify-center mb-10 shadow-inner">
        <Icon className="w-14 h-14 text-gray-300" />
      </div>
      
      <h3 className="text-2xl font-black text-gray-900 mb-4 text-center tracking-tight">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-500 text-center mb-12 max-w-sm font-medium leading-relaxed">
          {description}
        </p>
      )}
      
      <Link
        href={href}
        onClick={onButtonClick}
        className="inline-flex items-center gap-3 bg-[#00b5bc] hover:bg-[#00a3a9] text-white px-12 py-4 rounded-2xl font-black text-lg transition-all duration-300 shadow-xl shadow-[#00b5bc]/20 hover:scale-105 active:scale-95"
      >
        {ButtonIcon && <ButtonIcon className="w-6 h-6" />}
        {buttonText}
      </Link>
    </div>
  );
}
