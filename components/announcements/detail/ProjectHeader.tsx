import { mapStatus, formatTimeAgo } from "@/utils";
import { ProjectHeaderProps } from "@/types/detailComponents";
import { User, CalendarDays } from "lucide-react";

export default function ProjectHeader({ project }: ProjectHeaderProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Pending":
      case "Open":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "InProgress":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-700 border border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="mb-6" dir="ltr">
      {/* Status Badges */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-bold ${getStatusStyle(project.status)}`}
        >
          {mapStatus(project.status)}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-dark mb-3 text-right leading-tight">
        {project.title}
      </h1>

      {/* Meta Info: time + proposals count */}
      <div className="flex items-center gap-5 text-gray-medium  justify-end">
        <div className="flex items-center gap-1.5">
          <span>{formatTimeAgo(project.createdAt)}</span>
          <CalendarDays className="w-4 h-4 text-primary " />
        </div>
        <div className="flex items-center gap-1.5">
          <span>{project.proposalsCount} عرض</span>
          <User className="w-4 h-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
