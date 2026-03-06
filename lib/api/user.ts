import { apiClient } from "./apiClient";
import { UpdateProfilePayload } from "@/types/user";

class UserService {
  async getProfile() {
    const {data} = await apiClient.get("/User/profile");
    return data;
  }

  async updateBio(bio: { bio: string }) {
    const {data} = await apiClient.put("/User/bio", bio);
    return data;
  }

  async updateProfile(profileData: UpdateProfilePayload) {
    const { data } = await apiClient.put("/User/profile", profileData);
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

  async getCoverImage(id: string) {
    const { data } = await apiClient.get(`/User/cover-image/${id}`);
    return data;
  }

  async uploadCoverImage(file: File) {
    const formData = new FormData();
    formData.append("CoverImage", file);
    const { data } = await apiClient.post("/User/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  async getPortfolios() {
    const { data } = await apiClient.get("/User/portfolios");
    return data;
  }

  async addPortfolio(formData: FormData) {
    const { data } = await apiClient.post("/User/portfolios", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  async uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append("ProfilePicture", file);
    const { data } = await apiClient.post("/User/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  }

  async deletePortfolio(id: number) {
    const { data } = await apiClient.delete(`/User/portfolios/${id}`);
    return data;
  }
}

export const userService = new UserService();
