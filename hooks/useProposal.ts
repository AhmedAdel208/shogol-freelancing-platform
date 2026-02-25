import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { proposalApi } from "@/lib/api/proposal";
import { ProposalSubmitData } from "@/lib/validation/proposalSchema";

export const useProposal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProposalSubmitData) => proposalApi.submitProposal(data),
    onSuccess: (data, variables) => {
      // Invalidate the specific job request query to show new proposal immediately
      queryClient.invalidateQueries({
        queryKey: ["proposals", variables.jobRequestId],
      });
      // Also invalidate my-proposals to refresh the user's proposals list
      queryClient.invalidateQueries({
        queryKey: ["my-proposals"],
      });
    },
    onError: (error: any) => {
      console.error("Proposal submission failed:", error);
      console.error("Error response:", error?.response);
      console.error("Error data:", error?.response?.data);
      console.error("Error status:", error?.response?.status);
      console.error("Error message:", error?.message);
    },
  });
};

export const useProposalsByProposalId = (jobRequestId: number) => {
  return useQuery({
    queryKey: ["proposals", jobRequestId],
    queryFn: () => proposalApi.getProposalsByProposalId(jobRequestId),
  });
};
