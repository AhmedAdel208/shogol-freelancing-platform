import { apiClient } from "./apiClient";


class UserService {
  async updateBio(data: { bio: string }): Promise<any> {
    const response = await apiClient.put("/User/bio", data);
    return response.data;
  }
}

export const userService = new UserService();
