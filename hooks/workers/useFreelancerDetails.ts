import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";

export default function useFreelanceDetails({id}: {id: string}) {
  return useQuery({
    queryKey: ["freelancerDetails", id],
    queryFn: () => userService.getAccountDetails({id}) ,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in v5)
  })
}