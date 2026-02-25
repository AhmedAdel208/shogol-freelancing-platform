import { useMutation, useQueryClient } from "@tanstack/react-query";
import { proposalApi } from "@/lib/api/proposal";
import { ProposalFormData } from "@/lib/validation/proposalSchema";

export const useProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProposalFormData) => proposalApi.submitProposal(data),
    onSuccess: () => {
      // Invalidate relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
    },
    onError: (error) => {
      console.error("Proposal submission failed:", error);
    },
  });
};
