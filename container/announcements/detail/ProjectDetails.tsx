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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" dir="rtl">
      {/* Budget Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
          <Banknote className="w-6 h-6 text-primary group-hover:text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-[13px] font-bold font-cairo mb-0.5">الميزانية</span>
          <p className="text-lg font-black text-gray-900 font-cairo">
            {project.budget} <span className="text-sm font-bold text-gray-400 mr-0.5">ريال</span>
          </p>
        </div>
      </div>

      {/* Deadline Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
          <CalendarDays className="w-6 h-6 text-orange-500 group-hover:text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-[13px] font-bold font-cairo mb-0.5">الموعد النهائي</span>
          <p className="text-lg font-black text-gray-900 font-cairo">{getDeadlineDate()}</p>
        </div>
      </div>

      {/* Duration Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-300 group">
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
          <Clock className="w-6 h-6 text-blue-500 group-hover:text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-gray-400 text-[13px] font-bold font-cairo mb-0.5">المدة المتوقعة</span>
          <p className="text-lg font-black text-gray-900 font-cairo">
            {project.durationInDays} <span className="text-sm font-bold text-gray-400 mr-0.5">يوم</span>
          </p>
        </div>
      </div>
    </div>
  );
}
