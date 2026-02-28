import { apiClient } from "./apiClient";
import { SkillCategory } from "@/types/skills";

export const skillsService = {
  getSkills: async () => {
    const { data } = await apiClient.get<{ categories: SkillCategory[] }>(
      "/Skill",
    );
    return data;
  },

  addSkill: async (skillId: number) => {
    const { data } = await apiClient.post("/Skill/add", { skillId });
    return data;
  },

  addMultipleSkills: async (skillIds: number[]) => {
    const { data } = await apiClient.post("/Skill/add-multiple", { skillIds });
    return data;
  },
};
