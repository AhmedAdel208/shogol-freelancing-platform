import { apiClient } from "./apiClient";
import {
  JobRequestsResponse,
  SearchJobRequestsParams,
} from "@/types/jobRequest";
import { Project } from "@/types/announcements";
import { EditProjectFormData } from "@/lib/validation/editProjectSchema";

class JobRequestService {
  async updateJobRequest(id: string, data: EditProjectFormData) {
    const response = await apiClient.put(`/JobRequest/${id}`, data);
    return response.data;
  }

  async searchJobRequests(
    params: SearchJobRequestsParams,
  ): Promise<JobRequestsResponse> {
    const response = await apiClient.post("/JobRequest/search", params);
    return response.data;
  }

  async getJobRequest(id: string): Promise<Project> {
    const response = await apiClient.get(`/JobRequest/${id}`);
    return response.data;
  }

  async createJobRequest(formData: FormData): Promise<any> {
    const response = await apiClient.post("/JobRequest", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async deleteJobRequest(id: string | number): Promise<void> {
    await apiClient.delete(`/JobRequest/${id}`);
  }

  async deliverRequest(jobRequestId: number): Promise<{ message: string }> {
    const response = await apiClient.post(`/JobRequest/${jobRequestId}/freelancer-completed`);
    return response.data;
  }

  async evaluateFreelancer(
    jobRequestId: number,
    rating: number,
    comment: string,
  ): Promise<{ message: string }> {
    const response = await apiClient.post(`/FreelancerReview/add`, {
      jobRequestId,
      rating,
      comment,
    });
    return response.data;
  }
}

export const jobRequestService = new JobRequestService();
