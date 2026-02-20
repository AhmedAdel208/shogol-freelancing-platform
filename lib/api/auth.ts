import { apiClient } from "./apiClient";
import {
  RegisterFormData,
  RegisterResponse,
  VerifyOtpData,
  VerifyOtpResponse,
} from "@/types/auth";

class AuthService {
  async register(
    userData: RegisterFormData,
    profilePicture?: File,
  ): Promise<RegisterResponse> {
      const formData = new FormData();
      formData.append("FirstName", userData.firstName);
      formData.append("LastName", userData.lastName);
      formData.append("Email", userData.email);
      formData.append("PhoneNumber", userData.phone);
      formData.append("Password", userData.password);
      formData.append("Nationality", userData.nationality || "");
      formData.append("Gender", userData.gender || "");
      formData.append("AccountType", userData.accountType);
      formData.append("UserType", userData.accountType);
      formData.append("CompanyName", "");

      if (profilePicture) {
        formData.append("ProfilePicture", profilePicture);
      } else {
        formData.append("ProfilePicture", new Blob(), "empty.jpg");
      }

      const { data } = await apiClient.post("/Auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return data;
  }

  async verifyOtp(
    otpData: VerifyOtpData,
  ): Promise<VerifyOtpResponse> {
      const { data } = await apiClient.post("/Auth/verify-otp", otpData);
      
      // Standarizing error check based on common backends
      if (data.isSuccess === false || data.succeeded === false) {
          throw new Error(data.message || "فشل التحقق");
      }

      return data;
  }

  async resendOtp(
    payload: { phoneNumber?: string; email?: string },
  ): Promise<{ message: string }> {
      const { data } = await apiClient.post("/Auth/resend-otp", payload);
      return data;
  }
}

export const authService = new AuthService();
