import { apiClient } from "./apiClient";
import {
  ProposalSubmitData,
  ProposalDisplay,
} from "@/lib/validation/proposalSchema";

export const proposalApi = {
  submitProposal: async (data: ProposalSubmitData) => {
    const response = await apiClient.post("/Proposal", data);
    return response.data; // ✅ returns the created proposal with its id
  },

  getProposalsByProposalId: async (
    proposalId: number,
  ): Promise<ProposalDisplay> => {
    // ✅ changed from ProposalDisplay[] to ProposalDisplay
    const response = await apiClient.get(`/Proposal/${proposalId}`);
    return response.data;
  },

  // // ✅ new
  // getMyProposals: async (): Promise<ProposalDisplay[]> => {
  //   const response = await apiClient.get("/Proposal/my-proposals");
  //   return response.data;
  // },

  // ✅ accept proposal
  acceptProposal: async (proposalId: number): Promise<{ message: string }> => {
    const response = await apiClient.post(`/Proposal/${proposalId}/accept`);
    return response.data;
  },
};
