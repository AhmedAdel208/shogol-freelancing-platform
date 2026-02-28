"use client";

import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getProfile(),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
}
