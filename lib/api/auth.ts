import { RegisterFormData, ApiResponse, RegisterResponse } from "@/types/auth";

class AuthService {
  private baseUrl = "https://shogol.runasp.net/api/Auth";

  async register(
    userData: RegisterFormData,
    profilePicture?: File,
  ): Promise<ApiResponse<RegisterResponse>> {
    try {
      // Create FormData for multipart/form-data
      const formData = new FormData();

      // Map our form data to API field names
      formData.append("FirstName", userData.firstName);
      formData.append("LastName", userData.lastName);
      formData.append("Email", userData.email);
      formData.append("PhoneNumber", userData.phone);
      formData.append("Password", userData.password);
      formData.append("Nationality", userData.nationality);
      formData.append("Gender", userData.gender || "");
      formData.append("AccountType", userData.accountType);
      formData.append("UserType", userData.accountType); // API might expect both
      formData.append("CompanyName", ""); // Empty for individual accounts

      // Add profile picture if provided
      if (profilePicture) {
        formData.append("ProfilePicture", profilePicture);
      } else {
        formData.append("ProfilePicture", new Blob(), "empty.jpg"); // Empty file
      }

      const response = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: formData,
      });

      const data = await response.json();

      // Debug: log the actual API response
      console.log("API Response Status:", response.status);
      console.log("API Response Data:", data);

      // Check if registration was successful
      const isSuccess =
        response.ok ||
        data.succeeded ||
        data.isSuccess ||
        (typeof data.message === "string" &&
          (data.message.includes("نجاح") || data.message.includes("success")));

      if (isSuccess) {
        return {
          success: true,
          message: data.message || "تم التسجيل بنجاح",
          data: data,
        };
      }

      // Handle API errors
      return {
        success: false,
        message: data.message || data.title || "فشل التسجيل",
        errors: data.errors || {},
      };
    } catch (error) {
      return {
        success: false,
        message: "حدث خطأ في الاتصال بالخادم",
      };
    }
  }
}

export const authService = new AuthService();
