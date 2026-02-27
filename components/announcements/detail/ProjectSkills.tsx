import { ProjectSkillsProps } from "@/types/detailComponents";
import { Sparkles, Code2, Tags } from "lucide-react";

export default function ProjectSkills({ project }: ProjectSkillsProps) {
  if (!project.skills || project.skills.length === 0) {
    return null;
  }

  return (
    <div className=" pt-2 relative">
      <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-l from-transparent via-gray-200 to-transparent" />
      
      <div className="flex items-center justify-end gap-3 mb-6 text-right font-cairo">
        <h3 className="text-[1.3rem] font-black text-gray-900 tracking-tight">
          المهارات والأدوات المطلوبة
        </h3>
        <div className="w-10 h-10 rounded-[14px] bg-primary/10 flex items-center justify-center text-primary/80 border border-primary/20 shadow-inner">
           <Code2 size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex flex-wrap gap-3.5 justify-end">
        {project.skills.map((skill, index) => (
          <div
            key={skill.id}
            className="group relative cursor-default"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Soft Glowing Background on Hover */}
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <span className="relative flex items-center gap-2 bg-linear-to-r from-slate-50 to-white text-gray-700 border border-gray-200/80 px-5 py-2.5 rounded-[14px] shadow-sm shadow-gray-100/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
              <span className="text-[15px] font-bold font-cairo text-gray-800">{skill.nameAr}</span>
              <Tags size={14} className="text-gray-400 group-hover:text-primary transition-colors" strokeWidth={3} />
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}
