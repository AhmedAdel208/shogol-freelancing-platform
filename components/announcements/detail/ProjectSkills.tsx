import { ProjectSkillsProps } from "@/types/detailComponents";

export default function ProjectSkills({ project }: ProjectSkillsProps) {
  if (!project.skills || project.skills.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 pb-8 border-b border-border">
      <h3 className="text-lg font-bold text-gray-dark mb-4">
        المهارات المطلوبة
      </h3>
      <div className="flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span
            key={skill.id}
            className="bg-cyan-50 text-cyan-700 px-3.5 py-1.5 rounded-full text-sm font-bold"
          >
            {skill.nameAr}
          </span>
        ))}
      </div>
    </div>
  );
}
