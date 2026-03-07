import Image from "next/image";
import {
  CalendarDays,

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
      {/* Subtle Premium Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary/20 group-hover:bg-primary transition-colors duration-500" />

      <div className="p-6 sm:p-7 flex flex-col h-full">
        {/* Card Header & Status */}
        <div className="flex justify-between items-start mb-3 gap-4" dir="rtl">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-black font-cairo text-gray-800 leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-bold text-gray-400 font-cairo flex items-center gap-1">
                <CalendarDays size={12} />
                منذ {formatTimeAgo(project.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-bold font-cairo border ${statusColor} shadow-sm`}
            >
              {mapStatus(project.status)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500  leading-relaxed mb-6 line-clamp-2 font-cairo text-right">
          {project.description}
        </p>

        {/* Tags - More compact */}
        <div className="flex flex-wrap items-center justify-end gap-1.5 mb-6">
          {project.skills?.slice(0, 3).map((skill) => (
            <span
              key={skill.id}
              className="bg-gray-50 border border-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[11px] font-bold transition-all hover:border-primary/30 hover:text-primary"
            >
              {skill.nameAr}
            </span>
          ))}
          {project.skills && project.skills.length > 3 && (
            <span className="text-gray-400 text-[11px] font-bold px-1">
              +{project.skills.length - 3}
            </span>
          )}
        </div>

        {/* Stats Grid - Cleaner and more professional */}
        {/* <div className="grid grid-cols-3 gap-2 mt-auto pt-6 border-t border-gray-50" dir="rtl">
          <div className="flex flex-col items-center p-2 rounded-2xl bg-gray-50/50 border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all group/stat">
            <div className="p-1.5 rounded-lg bg-emerald-100/50 text-emerald-600 mb-1 group-hover/stat:bg-emerald-100">
              <Banknote size={14} />
            </div>
            <span className="text-xs font-black text-gray-800 font-cairo tracking-tight">
              {project.budget} <span className="text-[9px] text-gray-400">ريال</span>
            </span>
          </div>

          <div className="flex flex-col items-center p-2 rounded-2xl bg-gray-50/50 border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all group/stat">
            <div className="p-1.5 rounded-lg bg-sky-100/50 text-sky-600 mb-1 group-hover/stat:bg-sky-100">
              <Clock size={14} />
            </div>
            <span className="text-xs font-black text-gray-800 font-cairo tracking-tight">
              {project.durationInDays} <span className="text-[9px] text-gray-400">يوم</span>
            </span>
          </div>

          <div className="flex flex-col items-center p-2 rounded-2xl bg-gray-50/50 border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all group/stat">
            <div className="p-1.5 rounded-lg bg-purple-100/50 text-purple-600 mb-1 group-hover/stat:bg-purple-100">
              <BriefcaseBusiness size={14} />
            </div>
            <span className="text-xs font-black text-gray-800 font-cairo tracking-tight">
              {project.proposalsCount} <span className="text-[9px] text-gray-400">عروض</span>
            </span>
          </div>
        </div> */}

        {/* Bottom Bar: Client Info simplified */}
        <div className="flex items-center justify-end gap-2 -mt-5 " dir="ltr">
          <span className="text-[12px] font-bold text-gray-600 font-cairo group-hover:text-primary transition-colors">
            {project.clientName}
          </span>
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-gray-200">
            {project.clientAvatar ? (
              <Image
                src={project.clientAvatar}
                alt={project.clientName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] font-black bg-gray-50 text-gray-400">
                {project.clientName?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
