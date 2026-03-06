"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { skillsService } from "@/lib/api/skills";
import { toast } from "@/common/toast";

// Query to get all available skill categories and skills
export function useAllSkills(enabled: boolean = true) {
  return useQuery({
    queryKey: ["all-skills"],
    queryFn: () => skillsService.getSkills(),
    enabled,
    staleTime: 1000 * 60 * 60, // 1 hour cache since categories are mostly static
  });
}

// Query to get the current user's skills
export function useUserSkills(enabled: boolean = true) {
  return useQuery({
    queryKey: ["user-skills"],
    queryFn: () => skillsService.getUserSkills(),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}

// Mutation to add multiple skills to the user profile
export function useAddSkills(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (skillIds: number[]) => skillsService.addMultipleSkills(skillIds),
    onSuccess: () => {
      toast.success("تم إضافة المهارات بنجاح");
      queryClient.invalidateQueries({ queryKey: ["user-skills"] });
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error("فشل في إضافة المهارات");
    },
  });
}

// Mutation to delete a specific skill from the user profile
export function useDeleteSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userSkillId: number) => skillsService.deleteSkill(userSkillId),
    onSuccess: () => {
      toast.success("تم حذف المهارة بنجاح");
      queryClient.invalidateQueries({ queryKey: ["user-skills"] });
    },
    onError: () => {
      toast.error("فشل في حذف المهارة");
    },
  });
}
