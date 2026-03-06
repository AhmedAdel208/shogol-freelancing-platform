"use client";

import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";

export function useCoverImage(id: string) {
  return useQuery({
    queryKey: ["cover-image", id],
    queryFn: () => userService.getCoverImage(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, 
  });
}
