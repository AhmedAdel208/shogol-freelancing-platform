export interface ProposalFormData {
  description: string;
  price: number;
  duration: number;
}


export interface ProposalResponse {
  proposals: Proposal[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export interface Proposal {
  id: number
  jobRequestId: number
  jobRequestTitle: string
  freelancerId: string
  freelancerName: string
  freelancerAvatar: string
  freelancerRating: number
  freelancerCompletedJobs: number
  description: string
  proposedPrice: number
  proposedDurationInDays: number
  status: string
  createdAt: string
}