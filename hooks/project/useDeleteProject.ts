import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobRequestService } from "@/lib/api/jobRequests";

export function useDeleteProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (projectId: string) =>
      jobRequestService.deleteJobRequest(projectId),
    onSuccess: async () => {
      toast.success("تم حذف المشروع بنجاح");

      // BEST PRACTICE: await the queries so loading indications stay active until refetch completes
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["jobRequests"] }),
        queryClient.invalidateQueries({ queryKey: ["myProjects"] }),
        queryClient.invalidateQueries({ queryKey: ["project"] }),
      ]);

      // Redirect to announcements page after successful deletion
      router.push("/announcements");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف المشروع");
    },
  });

  const deleteProject = (projectId: string) => {
    deleteMutation.mutate(projectId);
  };

  return {
    deleteProject,
    isLoading: deleteMutation.isPending,
    error: deleteMutation.error,
  };
}
