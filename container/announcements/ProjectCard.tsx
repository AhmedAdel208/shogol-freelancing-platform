import Image from "next/image";
import {
  Banknote,
  Clock,
  CalendarDays,
  ArrowUpLeft,
  BriefcaseBusiness,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatTimeAgo, mapStatus } from "@/utils";
import { ProjectCardProps } from "@/types/announcements";

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/announcements/${project.id}`);
  };

  const isPending = project.status === "Pending";
  const statusColor = isPending
    ? "bg-amber-100 text-amber-700 border-amber-200"
    : project.status === "Accepted"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
      : "bg-sky-100 text-sky-700 border-sky-200";

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white w-full rounded-[40px] transition-all duration-500 ease-out hover:shadow-[0_40px_80px_-15px_rgba(30,170,173,0.15)] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Premium Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-primary/90" />

      <div className="p-8 sm:p-10 flex flex-col h-full">
        {/* Card Header */}
        <div className="flex justify-between items-start mb-6 gap-6" dir="rtl">
          <h2 className="text-2xl md:text-3xl font-black font-cairo text-primary leading-[1.3] line-clamp-2">
            {project.title}
          </h2>

          <div className="flex shrink-0 gap-3 items-center">
            {/* Go To Project Icon */}
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 hover:scale-110">
              <ArrowUpLeft size={20} strokeWidth={3} />
            </div>

            <span
              className={`px-5 py-2 rounded-full text-[14px] font-black font-cairo shadow-sm border ${statusColor}`}
            >
              {mapStatus(project.status)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-lg leading-relaxed mb-8 line-clamp-2 font-cairo text-right">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center justify-end gap-2 mb-8">
          {project.skills && project.skills.length > 4 && (
            <span className="bg-slate-50 border border-slate-100 text-slate-400 px-3 py-1.5 rounded-xl text-[12px] font-bold shadow-xs order-last">
              +{project.skills.length - 4}
            </span>
          )}
          {project.skills?.slice(0, 4).map((skill) => (
            <span
              key={skill.id}
              className="bg-slate-50 border border-slate-100/50 text-slate-500 px-4 py-1.5 rounded-xl text-[13px] font-bold transition-all hover:bg-white hover:border-primary/20 hover:text-primary"
            >
              {skill.nameAr}
            </span>
          ))}
        </div>

        {/* Stats Row - Premium Metric Pills */}
        <div
          className="flex flex-wrap items-center justify-end gap-4 mb-8 mt-auto"
          dir="rtl"
        >
          {/* Budget */}
          <div className="flex items-center gap-3 bg-emerald-50/40 border border-emerald-100/30 px-5 py-3 rounded-2xl group/metric hover:bg-emerald-50 transition-colors">
            <span className="text-emerald-600 font-extrabold font-cairo text-lg">
              {project.budget}{" "}
              <span className="text-[12px] opacity-70">ريال</span>
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100/50 flex items-center justify-center text-emerald-600 shadow-xs">
              <Banknote size={18} strokeWidth={2.5} />
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-3 bg-sky-50/40 border border-sky-100/30 px-5 py-3 rounded-2xl group/metric hover:bg-sky-50 transition-colors">
            <span className="text-sky-600 font-extrabold font-cairo text-lg">
              {project.durationInDays}{" "}
              <span className="text-[12px] opacity-70">يوم</span>
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-100/50 flex items-center justify-center text-sky-600 shadow-xs">
              <Clock size={18} strokeWidth={2.5} />
            </div>
          </div>

          {/* Proposals Count */}
          <div className="flex items-center gap-3 bg-purple-50/40 border border-purple-100/30 px-5 py-3 rounded-2xl group/metric hover:bg-purple-50 transition-colors">
            <span className="text-purple-600 font-extrabold font-cairo text-lg">
              {project.proposalsCount}{" "}
              <span className="text-[12px] opacity-70">عرض</span>
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-100/50 flex items-center justify-center text-purple-600 shadow-xs">
              <BriefcaseBusiness size={18} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Footer Divider */}
        <div
          className="border-t border-dashed border-slate-200 mt-2 pt-6 flex items-center justify-between w-full"
          dir="rtl"
        >
          {/* Client Info (Right in RTL) */}
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-50 ring-4 ring-white shadow-md flex items-center justify-center shrink-0">
              {project.clientAvatar ? (
                <Image
                  src={project.clientAvatar}
                  alt={project.clientName}
                  width={44}
                  height={44}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-slate-400 font-black font-cairo text-xl">
                  {project.clientName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-lg font-black text-slate-700 font-cairo group-hover:text-primary transition-colors">
              {project.clientName}
            </span>
          </div>

          {/* Date (Left in RTL) */}
          <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-4 py-2 rounded-xl shrink-0">
            <CalendarDays size={16} strokeWidth={2.5} />
            <span className="text-[13px] font-black font-cairo">
              منذ {formatTimeAgo(project.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
