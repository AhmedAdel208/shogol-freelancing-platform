export interface Skill {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface JobRequest {
  id: number;
  title: string;
  description: string;
  budget: number;
  durationInDays: number;
  status: string;
  createdAt: string;
  deadline: string;
  clientId: number;
  clientName: string;
  clientAvatar: string;
  skills: Skill[];
  proposalsCount: number;
}

export interface JobRequestsResponse {
  jobRequests: JobRequest[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface SearchJobRequestsParams {
  searchTerm?: string;
  skillIds?: number[];
  minBudget?: number;
  maxBudget?: number;
  status?: string;
  pageNumber: number;
  pageSize: number;
}
