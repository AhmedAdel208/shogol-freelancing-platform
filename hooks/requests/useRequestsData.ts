import { useState, useEffect } from "react";
import { requestsService } from "@/lib/api/requests";
import { userService } from "@/lib/api/user";
import { proposalApi } from "@/lib/api/proposal";
import { apiClient } from "@/lib/api/apiClient";
import { RequestResponse } from "@/types/requests";
import { ProposalResponse } from "@/types/proposal";
import { toast } from "@/lib/toast";
import { getCurrentUser } from "@/utils/auth";

export function useRequestsData() {
  const [data, setData] = useState<RequestResponse | null>(null);
  const [proposals, setProposals] = useState<ProposalResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  async function fetchRequests() {
    try {
      setIsLoading(true);
      const response = await requestsService.fetchMyRequests();
      console.log(response);
      setData(response.data);
    } catch (error: any) {
      console.error("Error fetching requests:", error);
      console.error("Error details:", {
        message: error.message,
        status: error.status,
        response: error.response,
        isBackendError: error.isBackendError,
        errors: error.errors
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchMyProposals() {
    try {
      const response = await proposalApi.getMyProposals();
      console.log(response);
      setProposals(response);
    } catch (error) {
      console.error("Error fetching my proposals:", error);
    }
  }

  async function fetchUserProfile() {
    try {
      const user = getCurrentUser();
      if (user) {
        setCurrentUser(user);
        const profile = await userService.getProfile();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  async function handleDeleteProposal(proposalId: number) {
    try {
      await proposalApi.deleteProposal(proposalId);
      // Refresh the proposals list after deletion
      fetchMyProposals();
    } catch (error) {
      console.error("Error deleting proposal:", error);
    }
  }

  async function handleDeleteJobRequest(jobRequestId: number) {
    try {
      await proposalApi.deleteJobRequest(jobRequestId);
      // Refresh the requests list after deletion
      fetchRequests();
    } catch (error) {
      console.error("Error deleting job request:", error);
    }
  }

  async function handleEditJobRequest(jobRequestId: number) {
    // Navigate to edit page for the job request
    window.location.href = `/announcements/edit/${jobRequestId}`;
  }

  async function handleEvaluateFreelancer(jobRequestId: number, freelancerId: string) {
    try {
      // Show loading toast
      // const loadingToast = toast.loading("جاري إرسال التقييم...");
      
      // Call evaluation API
      await proposalApi.evaluateFreelancer(jobRequestId, freelancerId, 5, "تم التقييم بنجاح");
      
      // Dismiss loading toast first
      // toast.dismiss(loadingToast);  
      
      // Then show success toast
      toast.success("تم تقييم المستقل بنجاح");
    } catch (error) {
      console.error("Error evaluating freelancer:", error);
      toast.error((error as Error)?.message || "حدث خطأ أثناء تقييم المستقل");
    }
  }

  useEffect(() => {
    // Check if user is authenticated
    const user = getCurrentUser();
    if (!user) {
      window.location.href = "/login";
      return;
    }

    // User is authenticated, fetch data and set auth checking to false
    fetchRequests();
    fetchUserProfile();
    setIsAuthChecking(false);
  }, []);

  useEffect(() => {
    fetchMyProposals();
  }, []);

  return {
    data,
    proposals,
    isLoading,
    userProfile,
    currentUser,
    isAuthChecking,
    handleDeleteProposal,
    handleDeleteJobRequest,
    handleEditJobRequest,
    handleEvaluateFreelancer
  };
}
