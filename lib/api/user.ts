import { apiClient } from "./apiClient";


class UserService {
  async getProfile() {
    const response = await apiClient.get("/User/profile");
    return response.data;
  }

  async updateBio(data: { bio: string }){
    const response = await apiClient.put("/User/bio", data);
    return response.data;
  }
}

export const userService = new UserService();
