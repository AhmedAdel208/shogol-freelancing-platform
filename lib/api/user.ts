import { apiClient } from "./apiClient";

class UserService {
  async updateBio(data: { bio: string }): Promise<any> {
    const response = await apiClient.put("/User/bio", data);
    return response.data;
  }

  async searchFreelancers(payload: any = {}): Promise<any> {
    const response = await apiClient.post("/User/freelancers/search", payload);
    return response.data;
  }

async getAccountDetails({ id }: { id: string }) {
  const response = await apiClient.get(`/User/freelancer-account-details/${id}`);
  return response.data;
}
}

export const userService = new UserService();
