export interface RequestResponse {
  jobRequests: any[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export interface JobRequest {
  id: number
  title: string
  description: string
  budget: number
  durationInDays: number
  status: string
  createdAt: string
  deadline: string
  clientName: string
  clientAvatar: string
  skills: Skill[]
  proposalsCount: number
}

export interface Skill {
  id: number
  nameAr: string
  nameEn: string
}
