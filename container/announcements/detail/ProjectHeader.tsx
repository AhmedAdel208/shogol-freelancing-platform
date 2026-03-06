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
    <div className="mb-6 relative" dir="rtl">
      {/* Top Meta Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Status Pill - Refined and Modern */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border w-fit ${
          isPending 
            ? "bg-amber-50 border-amber-200 text-amber-700" 
            : project.status === "Accepted"
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-slate-50 border-slate-200 text-slate-700"
        }`}>
          {isPending ? <Clock size={14} strokeWidth={2.5} /> : project.status === "Accepted" ? <CheckCircle2 size={14} strokeWidth={2.5} /> : <User size={14} strokeWidth={2.5} />}
          <span className="text-[13px] font-bold font-cairo">{mapStatus(project.status)}</span>
        </div>

        {/* Meta Stats Row */}
        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center transition-colors group-hover:bg-primary/5 group-hover:border-primary/20">
              <CalendarDays className="w-4 h-4 text-gray-400 group-hover:text-primary" strokeWidth={2} />
            </div>
            <span className="font-cairo text-sm text-gray-600">{formatTimeAgo(project.createdAt)}</span>
          </div>
          
          <div className="w-px h-4 bg-gray-200 hidden sm:block" />

          <div className="flex items-center gap-2 group cursor-default">
            <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
              <User className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
            <p className="font-cairo text-sm font-bold text-gray-700">
              {project.proposalsCount} <span className="font-medium text-gray-500 mr-1">عروض مقدمة</span>
            </p>
          </div>
        </div>
      </div>

      {/* Title - Clean and Impactful */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-cairo text-gray-900 leading-tight tracking-tight">
        {project.title}
      </h1>
    </div>
  );
}
