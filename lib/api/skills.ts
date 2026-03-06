import { apiClient } from "./apiClient";
import { SkillCategory, UserSkillsResponse } from "@/types/skills";

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

  getUserSkills: async () => {
    const { data } = await apiClient.get<UserSkillsResponse>("/Skill/user-skills");
    return data;
  },

  deleteSkill: async (userSkillId: number) => {
    const { data } = await apiClient.delete(`/Skill/${userSkillId}`);
    return data;
  },
};
