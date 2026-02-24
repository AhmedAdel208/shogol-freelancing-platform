import { apiClient } from "./apiClient";
import { ProposalFormData } from "@/lib/validation/proposalSchema";

export const proposalApi = {
  submitProposal: async (data: ProposalFormData) => {
    const response = await apiClient.post("/Proposal", data);
    return response.data;
  },
};
