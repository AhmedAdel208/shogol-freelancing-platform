import { Banknote, Clock, User, Timer } from "lucide-react";
import { ProjectDetailsProps } from "@/types/detailComponents";
import { mapStatus } from "@/utils";

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
      <div className="bg-bg rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <Banknote className="w-5 h-5 text-emerald-500" />
          <span className=" text-gray-medium">الميزانية</span>
        </div>
        <p className="text-lg md:text-xl font-bold text-gray-dark text-right">
          {project.budget} ريـال
        </p>
      </div>

      <div className="bg-bg rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-blue-500" />
          <span className=" text-gray-medium">المدة</span>
        </div>
        <p className="text-lg md:text-xl font-bold text-gray-dark text-right">
          {project.durationInDays} يوم
        </p>
      </div>

      <div className="bg-bg rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <User className="w-5 h-5 text-purple-500" />
          <span className=" text-gray-medium">عدد العروض</span>
        </div>
        <p className="text-lg md:text-xl font-bold text-gray-dark text-right">
          {project.proposalsCount} عرض
        </p>
      </div>

      <div className="bg-bg rounded-lg p-4 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <Timer className="w-5 h-5 text-primary" />
          <span className=" text-gray-medium">الحالة</span>
        </div>
        <p className="text-lg md:text-xl font-bold text-gray-dark text-right">
          {mapStatus(project.status)}
        </p>
      </div>
    </div>
  );
}
