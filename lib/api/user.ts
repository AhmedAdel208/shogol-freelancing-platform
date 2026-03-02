import { apiClient } from "./apiClient";

class UserService {
  async getProfile() {
    const {data} = await apiClient.get("/User/profile");
    return data;
  }

  async updateBio(bio: { bio: string }) {
    const {data} = await apiClient.put("/User/bio", bio);
    return data;
  }

  async searchFreelancers(payload: any = {}) {
    const {data} = await apiClient.post("/User/freelancers/search", payload);
    return data;
  }

  async getAccountDetails({ id }: { id: string }) {
    const {data} = await apiClient.get(
      `/User/freelancer-account-details/${id}`,
    );
    return  data;
  }
}

export const userService = new UserService();
