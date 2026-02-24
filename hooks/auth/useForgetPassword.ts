"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validation/loginSchema";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/lib/api/auth";


export function useForgetPassword() {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {mutate, isPending: isSubmitting} = useMutation({
    mutationFn:(data: ForgotPasswordFormData) => authService.forgotPassword(data),
    onSuccess: (_, variables) => {
      router.push(`/reset-password?email=${encodeURIComponent(variables.email)}`)
    },
    onError: (error) => {
      setError("root", {
        message: error.message || "حدث خطأ أثناء إعادة التعيين"
      })
    }
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
       console.log("Forgot Password data:", data);
     mutate(data)
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
}