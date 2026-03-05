import { apiClient } from "./apiClient";
import {
  ProposalSubmitData,
  ProposalDisplay,
} from "@/lib/validation/proposalSchema";
import { ProposalResponse } from "@/types/proposal";

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
  getMyProposals: async (): Promise<ProposalResponse> => {
    const response = await apiClient.get("/Proposal/my-proposals");
    return response.data;
  },

  // ✅ accept proposal
  acceptProposal: async (proposalId: number): Promise<{ message: string }> => {
    const response = await apiClient.post(`/Proposal/${proposalId}/accept`);
    return response.data;
  },

  // ✅ delete proposal
  deleteProposal: async (proposalId: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/Proposal/${proposalId}`);
    return response.data;
  },

  // ✅ delete job request
  deleteJobRequest: async (jobRequestId: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/JobRequest/${jobRequestId}`);
    return response.data;
  },

  // ✅ evaluate freelancer
  evaluateFreelancer: async (jobRequestId: number, freelancerId: string, rating: number, comment: string): Promise<{ message: string }> => {
    const response = await apiClient.post(`/FreelancerReview/add`, {
      jobRequestId,
      rating,
      comment
    });
    return response.data;
  },

  // ✅ deliver request
  deliverRequest: async (jobRequestId: number): Promise<{ message: string }> => {
    const response = await apiClient.post(`/JobRequest/${jobRequestId}/freelancer-completed`);
    return response.data;
  },
};
