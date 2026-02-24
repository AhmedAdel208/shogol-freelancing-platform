import { mapStatus, formatTimeAgo } from "@/utils";
import { ProjectHeaderProps } from "@/types/detailComponents";

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-bold ${
              project.status === "Pending"
                ? "bg-green-100 text-green-700"
                : "bg-[#E0F2FE] text-[#0284C7]"
            }`}
          >
            {mapStatus(project.status)}
          </span>
          <span className="text-gray-medium ">
            {formatTimeAgo(project.createdAt)}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-dark mb-4 text-right">
          {project.title}
        </h1>
      </div>
    </div>
  );
}
