import { ProjectSkillsProps } from "@/types/detailComponents";

export default function ProjectSkills({ project }: ProjectSkillsProps) {
  if (!project.skills || project.skills.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-dark mb-4 text-right">
        المهارات المطلوبة
      </h3>
      <div className="flex flex-wrap gap-2 justify-end">
        {project.skills.map((skill) => (
          <span
            key={skill.id}
            className="border border-primary text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary/5 transition-colors cursor-default"
          >
            {skill.nameAr}
          </span>
        ))}
      </div>
    </div>
  );
}
