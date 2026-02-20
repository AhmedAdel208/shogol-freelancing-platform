import { apiClient } from "./apiClient";
import { SkillCategory } from "@/types/skills";

export const skillsService = {
  getSkills: async () => {
    const response = await apiClient.get<{ categories: SkillCategory[] }>("/Skill");
    return response.data;
  },

  addSkill: async (skillId: number) => {
    const response = await apiClient.post("/Skill/add", { skillId });
    return response.data;
  },

  addMultipleSkills: async (skillIds: number[]) => {
    const response = await apiClient.post("/Skill/add-multiple", { skillIds });
    return response.data;
  },
};
