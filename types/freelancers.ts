import { Skill } from "./skills"

export interface Freelancer {
  id: string
  fullName: string
  profilePictureUrl: string
  bio: string
  rating: number
  completedJobsCount: number
  nationality: any
  skills: Skill[]
}