import { apiClient } from "./apiClient";
import { JobRequestsResponse, SearchJobRequestsParams } from "@/types/jobRequest";

class JobRequestService {
  async searchJobRequests(params: SearchJobRequestsParams): Promise<JobRequestsResponse> {
    const response = await apiClient.post("/JobRequest/search", params);
    return response.data;
  }
}

export const jobRequestService = new JobRequestService();
