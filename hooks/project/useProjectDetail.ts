import { useQuery } from "@tanstack/react-query";
import { jobRequestService } from "@/lib/api/jobRequests";
import { UseProjectDetailProps } from "@/types/projectDetail";
import { Project } from "@/types/announcements";

export const useProjectDetail = ({ id }: UseProjectDetailProps) => {
  return useQuery<Project>({
    queryKey: ["project", id],
    queryFn: () => jobRequestService.getJobRequest(id),

    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in v5)
  });
};

export default useProjectDetail;
