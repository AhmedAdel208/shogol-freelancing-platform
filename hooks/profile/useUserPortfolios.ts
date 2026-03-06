import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";
import { toast } from "@/common/toast";

export function useUserPortfolios() {
  return useQuery({
    queryKey: ["user-portfolios"],
    queryFn: () => userService.getPortfolios(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useAddPortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => userService.addPortfolio(formData),
    onSuccess: () => {
      toast.success("تم إضافة العمل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["user-portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("فشل في إضافة العمل");
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.deletePortfolio(id),
    onSuccess: () => {
      toast.success("تم حذف العمل بنجاح");
      queryClient.invalidateQueries({ queryKey: ["user-portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("فشل في حذف العمل");
    },
  });
}
