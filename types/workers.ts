import { SkillCategory } from "./skills"

export interface Worker {
  id: string
  fullName: string
  email: string
  phoneNumber: string
  profilePictureUrl: string
  coverImageUrl: string
  address: any
  bio: string
  gender: string
  nationality: any
  lastOnlineAt: string
  createdAt: string
  averageRating: number
  completedJobsCount: number
  reviews: Review[]
  portfolios: Portfolio[]
  skillCategories: SkillCategory[]
}

export interface Review {
  id: number
  reviewerId: string
  reviewerName: string
  reviewerProfilePictureUrl: string
  rating: number
  comment: string
  createdAt: string
  jobRequestId: number
  jobTitle: string
}

export interface Portfolio {
  id: number
  title: string
  description: string
  imageUrl: string
  projectUrl: string
  createdAt: string
}


