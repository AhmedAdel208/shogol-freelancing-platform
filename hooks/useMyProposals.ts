import { proposalApi } from "@/lib/api/proposal";
import { useQuery } from "@tanstack/react-query";

export const useMyProposals = () => {
  return useQuery({
    queryKey: ["my-proposals"],
    queryFn: () => proposalApi.getMyProposals(),
  });
};
