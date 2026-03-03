"use client";

import { useQuery } from "@tanstack/react-query";
import { skillsService } from "@/lib/api/skills";

export function useUserSkills() {
  return useQuery({
    queryKey: ["user-skills"],
    queryFn: () => skillsService.getUserSkills(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
