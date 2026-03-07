import { ProjectSkillsProps } from "@/types/detailComponents";
import { Sparkles, Code2, Tags } from "lucide-react";

export default function ProjectSkills({ project }: ProjectSkillsProps) {
  if (!project.skills || project.skills.length === 0) {
    return null;
  }

  return (
    <div className=" relative" dir="rtl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400">
           <Code2 size={20} strokeWidth={2.5} />
        </div>
        <h3 className="text-xl font-black text-gray-900 font-cairo">
          المهارات المطلوبة
        </h3>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {project.skills.map((skill) => (
          <div
            key={skill.id}
            className="group flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl transition-all duration-300 hover:border-primary/30 hover:bg-white hover:shadow-sm"
          >
            <span className="text-sm font-bold font-cairo text-gray-700 group-hover:text-primary">{skill.nameAr}</span>
            <Tags size={14} className="text-gray-300 group-hover:text-primary/50 transition-colors" strokeWidth={2.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
