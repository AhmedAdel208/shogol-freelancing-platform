import { apiClient } from "./apiClient";
import {
  JobRequestsResponse,
  SearchJobRequestsParams,
} from "@/types/jobRequest";
import { Project } from "@/types/announcements";

class JobRequestService {
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

  async deleteJobRequest(id: string): Promise<void> {
    await apiClient.delete(`/JobRequest/${id}`);
  }
}

export const jobRequestService = new JobRequestService();
