import { Banknote, Clock, CalendarDays } from "lucide-react";
import { ProjectDetailsProps } from "@/types/detailComponents";

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  // Calculate the deadline date from createdAt + durationInDays
  const getDeadlineDate = (): string => {
    if (project.deadline) {
      const date = new Date(project.deadline);
      return date.toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    const createdDate = new Date(project.createdAt);
    const deadlineDate = new Date(createdDate);
    deadlineDate.setDate(deadlineDate.getDate() + project.durationInDays);
    return deadlineDate.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Budget Card */}
      <div className="bg-white rounded-xl border border-border p-5 flex items-center gap-3 justify-end hover:shadow-md transition-shadow">
        <div className="text-right">
          <span className="text-gray-medium text-sm block mb-1">الميزانية</span>
          <p className="text-lg font-bold text-primary">
            {project.budget} ريـال
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Banknote className="w-5 h-5 text-primary" />
        </div>
      </div>
      {/* Deadline Card */}
      <div className="bg-white rounded-xl border border-border p-5 flex items-center gap-3 justify-end hover:shadow-md transition-shadow">
        <div className="text-right">
          <span className="text-gray-medium text-sm block mb-1">
            الموعد النهائي
          </span>
          <p className="text-lg font-bold text-red-500">{getDeadlineDate()}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
          <CalendarDays className="w-5 h-5 text-red-500" />
        </div>
      </div>

      {/* Duration Card */}
      <div className="bg-white rounded-xl border border-border p-5 flex items-center gap-3 justify-end hover:shadow-md transition-shadow">
        <div className="text-right">
          <span className="text-gray-medium text-sm block mb-1">المدة</span>
          <p className="text-lg font-bold text-dark">
            {project.durationInDays} يوم
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5 text-dark" />
        </div>
      </div>
    </div>
  );
}
