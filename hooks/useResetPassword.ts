"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/lib/api/auth";
import { useTimer } from "@/hooks/useTimer";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validation/loginSchema";

export function useResetPassword(email: string) {
  const router = useRouter();
  const { timer, resetTimer } = useTimer(30);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      code: "",
    },
  });

  // Reset Password Mutation
  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: (data: ResetPasswordFormData) =>
      authService.resetPassword({
        email,
        resetToken: data.code,
        newPassword: data.password,
      }),
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      setError("root", {
        message: error.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور",
      });
    },
  });

  // Resend OTP Mutation
  const { mutate: resendMutate, isPending: isResending } = useMutation({
    mutationFn: () => authService.forgotPassword({ email }),
    onSuccess: () => {
      resetTimer(30);
    },
    onError: (error) => {
      setError("root", {
        message: error.message || "فشل إعادة إرسال الرمز",
      });
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log("Reset Password data:", data);
    mutate(data);
  };

  const handleResend = () => {
    if (timer > 0 || isResending) return;
    resendMutate();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    isSubmitting,
    timer,
    isResending,
    handleResend,
  };
}
