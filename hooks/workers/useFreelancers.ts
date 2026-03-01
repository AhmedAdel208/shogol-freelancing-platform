import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";
import { Freelancer } from "@/types/freelancers";

interface FreelancersResponse {
  freelancers: Freelancer[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

interface FreelancerSearchParams {
  searchTerm?: string;
  skillIds?: number[];
  nationality?: string;
  minRating?: number;
  pageNumber?: number;
  pageSize?: number;
}

export function useFreelancers(searchParams?: FreelancerSearchParams) {
  return useQuery<FreelancersResponse>({
    queryKey: ["freelancers", searchParams],
    queryFn: () => userService.searchFreelancers(searchParams || {}),
  });
}
