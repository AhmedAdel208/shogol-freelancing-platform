import { apiClient } from "./apiClient";
import { EditProjectFormData } from "@/lib/validation/editProjectSchema";

export interface UpdateProjectResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

class UpdateProjectService {
  async updateProject(
    id: string,
    data: EditProjectFormData,
  ): Promise<UpdateProjectResponse> {
    try {
      const response = await apiClient.put(`/JobRequest/${id}`, data);
      return {
        success: true,
        message: "تم تحديث المشروع بنجاح",
        data: response.data,
      };
    } catch (error: unknown) {
      const errorMessage = error && typeof error === 'object' && 'response' in error 
        ? (error as any).response?.data?.message 
        : "فشل تحديث المشروع";
      
      return {
        success: false,
        message: errorMessage || "فشل تحديث المشروع",
      };
    }
  }
}

export const updateProjectService = new UpdateProjectService();
