import { mapStatus, formatTimeAgo } from "@/utils";
import { ProjectHeaderProps } from "@/types/detailComponents";
import { User, CalendarDays, Clock, CheckCircle2, XCircle, Sparkles, FolderOpen } from "lucide-react";

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const isPending = project.status === "Pending";
  const statusConfig = isPending 
    ? {
        bg: "bg-gradient-to-r from-amber-400 to-orange-400",
        shadow: "shadow-amber-500/20 shadow-lg",
        text: "text-white",
        icon: <Clock size={15} className="text-white drop-shadow-sm" strokeWidth={3} />
      }
    : project.status === "Accepted"
    ? {
        bg: "bg-gradient-to-r from-emerald-400 to-teal-500",
        shadow: "shadow-emerald-500/20 shadow-lg",
        text: "text-white",
        icon: <CheckCircle2 size={15} className="text-white drop-shadow-sm" strokeWidth={3} />
      }
    : {
        bg: "bg-gradient-to-r from-slate-600 to-slate-800",
        shadow: "shadow-slate-500/20 shadow-lg",
        text: "text-white",
        icon: <User size={15} className="text-white drop-shadow-sm" strokeWidth={3} />
      };

  return (
    <div className="mb-8 relative" dir="ltr">
      {/* Decorative Blur behind header */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />

      {/* Top Meta Area */}
      <div className="flex items-center justify-end gap-3 mb-6">
        {/* Status Pill (Elevated) */}
        <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.shadow} ${statusConfig.text}`}>
          {statusConfig.icon}
          <span className="text-[13px] font-extrabold font-cairo mb-px tracking-wide">{mapStatus(project.status)}</span>
        </div>


      </div>

      {/* Title */}
      <h1 className="text-[30px] sm:text-[34px] md:text-[36px] lg:text-[38px] font-black font-cairo text-transparent bg-clip-text bg-linear-to-b from-gray-900 via-gray-800 to-gray-600 mb-5 text-right leading-tight tracking-tight -mr-1">
        {project.title}
      </h1>

      {/* Bottom Meta Info Layout */}
      <div className="flex flex-wrap items-center gap-4 text-gray-500 justify-end mt-2">
        <div className="flex items-center gap-2 bg-linear-to-b from-white to-gray-50 px-4 py-2 rounded-xl border border-gray-200/60 shadow-sm">
          <span className="font-cairo font-bold text-[14px] leading-none mb-px">{formatTimeAgo(project.createdAt)}</span>
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
            <CalendarDays className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-linear-to-b from-white to-primary/30 px-4 py-2 rounded-xl border border-purple-100/60 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r from-primary-400 to-primary transform translate-y-full group-hover:translate-y-0 transition-transform" />
          <span className="font-cairo font-black text-[15px] text-primary leading-none mb-px" dir="rtl">{project.proposalsCount} <span className="font-bold text-sm text-primary/80 mr-1">عروض مقدمة</span></span>
          <div className="w-6 h-6 rounded-md bg-purple-100 flex items-center justify-center relative">
            <User className="w-3.5 h-3.5 text-primary relative z-10 box-content" strokeWidth={3} />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
