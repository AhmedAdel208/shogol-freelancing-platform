import Image from "next/image";
import { Banknote, Clock, User, CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatTimeAgo, mapStatus } from "@/utils";
import { ProjectCardProps } from "@/types/announcements";

export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/announcements/${project.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-300 group flex flex-col cursor-pointer border border-transparent hover:border-primary "
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4 gap-4">
        <h2 className="text-xl sm:text-[22px] font-bold font-el-missiri text-slate-900 group-hover:text-primary transition-colors cursor-pointer leading-tight">
          {project.title}
        </h2>
        <span className="bg-[#E0F2FE] text-[#0284C7] px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shrink-0">
          {mapStatus(project.status)}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-500 leading-relaxed mb-5 max-w-2xl line-clamp-3">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-6 cursor-pointer mt-auto">
        {project.skills?.slice(0, 4).map((skill) => (
          <span
            key={skill.id}
            className="bg-cyan-50 text-cyan-700 px-3.5 py-1.5 rounded-full text-sm font-bold hover:bg-cyan-100 transition-colors"
          >
            {skill.nameAr}
          </span>
        ))}
        {project.skills && project.skills.length > 4 && (
          <span className="bg-slate-100 text-slate-600 px-3.5 py-1.5 rounded-full text-sm font-bold">
            + {project.skills.length - 4}
          </span>
        )}
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center justify-between gap-y-3 mb-6">
        <div className="flex items-center gap-2">
          <Banknote className="w-5 h-5 text-emerald-500" strokeWidth={2.5} />
          <span className="text-slate-700 text-sm font-bold">
            {project.budget} ريـال
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
          <span className="text-slate-700 text-sm font-bold">
            {project.durationInDays} يوم
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-purple-500" strokeWidth={2.5} />
          <span className="text-slate-700 text-sm font-bold">
            {project.proposalsCount} عرض
          </span>
        </div>
      </div>

      {/* Card Footer Divider */}
      <div className="border-t border-slate-100 pt-5 flex items-center justify-between w-full mt-auto">
        <div className="flex items-center gap-3 cursor-pointer group/author">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 ring-2 ring-transparent group-hover/author:ring-primary/20 transition-all flex items-center justify-center">
            {project.clientAvatar ? (
              <Image
                src={project.clientAvatar}
                alt={project.clientName}
                width={36}
                height={36}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-slate-400 font-bold">
                {project.clientName?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-sm font-bold text-slate-700 group-hover/author:text-primary transition-colors max-w-25 truncate">
            {project.clientName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-dark shrink-0">
          <CalendarDays className="w-4.5 h-4.5" strokeWidth={2} />
          <span className="text-sm font-medium">
            {formatTimeAgo(project.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
