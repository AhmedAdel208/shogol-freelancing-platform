import { apiClient } from "./apiClient";
import { EditProjectFormData } from "@/lib/validation/editProjectSchema";

class UpdateProjectService {
  async updateProject(id: string, data: EditProjectFormData) {
    const response = await apiClient.put(`/JobRequest/${id}`, data);
    return response.data;
  }
}

export const updateProjectService = new UpdateProjectService();
