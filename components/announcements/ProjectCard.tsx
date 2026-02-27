import Image from "next/image";
import { Banknote, Clock, User, CalendarDays, ArrowUpLeft, BriefcaseBusiness } from "lucide-react";
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
      className="group relative bg-[#ffffff] w-full text-right rounded-[24px] transition-all duration-400 ease-out hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] shadow-[0_2px_10px_rgb(0,0,0,0.03)] border border-gray-100/80 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Decorative Top Line Based on Status - Soft Primary Color normally */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 w-full bg-linear-to-r from-primary to-teal-400 opacity-80 group-hover:opacity-100 transition-opacity" 
      />

      <div className="p-6 sm:p-7 flex flex-col h-full">
        {/* Card Header */}
        <div className="flex justify-between items-start mb-4 gap-4">
          <h2 className="text-[1.3rem] font-black font-cairo text-gray-900 group-hover:text-primary transition-colors leading-[1.4] line-clamp-2">
            {project.title}
          </h2>
          
          <div className="flex shrink-0 gap-2 items-center">
            {/* Go To Project Icon (Appears on Hover) */}
            <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowUpLeft size={16} strokeWidth={2.5} />
            </div>

            <span className={`px-3.5 py-1.5 rounded-full text-[13px] font-extrabold border shadow-xs whitespace-nowrap ${statusColor}`}>
              {mapStatus(project.status)}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-[15px] leading-relaxed mb-6 line-clamp-3 font-cairo">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {project.skills?.slice(0, 4).map((skill) => (
            <span
              key={skill.id}
              className="bg-slate-50 border border-slate-100/80 text-slate-600 px-3 py-1 rounded-lg text-[13px] font-bold shadow-xs transition-colors hover:bg-slate-100"
            >
              {skill.nameAr}
            </span>
          ))}
          {project.skills && project.skills.length > 4 && (
            <span className="bg-slate-50 border border-slate-100/80 text-slate-600 px-3 py-1 rounded-lg text-[13px] font-bold shadow-xs">
              +{project.skills.length - 4}
            </span>
          )}
        </div>

        {/* Stats Row (Elegant Metric Cards format) */}
        <div className="flex flex-wrap items-center gap-3 mb-6 mt-auto">
          {/* Budget */}
          <div className="flex items-center gap-2 bg-emerald-50/50 border border-emerald-100/50 px-3 py-2 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Banknote size={16} strokeWidth={2.5} />
            </div>
            <span className="text-emerald-800 text-[14px] font-bold">
              {project.budget} ريـال
            </span>
          </div>
          
          {/* Duration */}
          <div className="flex items-center gap-2 bg-sky-50/50 border border-sky-100/50 px-3 py-2 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600">
              <Clock size={16} strokeWidth={2.5} />
            </div>
            <span className="text-sky-800 text-[14px] font-bold">
              {project.durationInDays} يوم
            </span>
          </div>

          {/* Proposals Count */}
          <div className="flex items-center gap-2 bg-purple-50/50 border border-purple-100/50 px-3 py-2 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
              <BriefcaseBusiness size={16} strokeWidth={2.5} />
            </div>
            <span className="text-purple-800 text-[14px] font-bold">
              {project.proposalsCount} عرض
            </span>
          </div>
        </div>

        {/* Card Footer Divider (Client Info) */}
        <div className="border-t border-dashed border-gray-200 mt-2 pt-5 flex items-center justify-between w-full">
          <div className="flex items-center gap-3 w-1/2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-50 ring-2 ring-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow shrink-0">
              {project.clientAvatar ? (
                <Image
                  src={project.clientAvatar}
                  alt={project.clientName}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-slate-400 font-black font-cairo text-lg">
                  {project.clientName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <span className="text-[14px] font-bold text-gray-700 truncate group-hover:text-primary transition-colors">
              {project.clientName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg shrink-0">
            <CalendarDays size={14} strokeWidth={2.5} />
            <span className="text-[12px] font-extrabold font-cairo">
              {formatTimeAgo(project.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
