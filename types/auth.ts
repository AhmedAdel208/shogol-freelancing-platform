export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  accountType: "freelancer" | "company";
  gender?: "male" | "female";
  nationality?: string;
  agreed: boolean;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface RegisterResponse {
  userId: string;
  email: string;
  message: string;
  isSuccess?: boolean;
  success?: boolean;
}

export interface VerifyOtpData {
  phoneNumber?: string;
  email?: string;
  otpCode: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  token?: string;
  userId?: string;
}

export interface SucessRegisterProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: RegisterFormData;
  userImage?: File;
}
export interface UseSuccessRedirectProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl: string;
  delay?: number;
  userImage?: File;
}

export interface VerifyActionState {
  error: string;
  success?: boolean;
}

export type LoginFormData = {
  EmailOrPhone: string;
  password: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type ResetPasswordFormData = {
  code: string;
  password: string;
  confirmPassword: string;
};

export interface ResetPasswordData {
  email: string;
  resetToken: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}
