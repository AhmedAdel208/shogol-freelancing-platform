"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/auth";
import { loginSchema, type LoginFormData } from "@/lib/validation/loginSchema";
import { useAuthStore } from "@/stores/useAuthStore";

export function useLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormData) => authService.login(data),
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        useAuthStore.getState().setToken(data.token);
      }
      router.push("/");
    },
    onError: (error) => {
      setError("root", {
        message: error.message || "فشل تسجيل الدخول. يرجى التحقق من بياناتك.",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isPending,
  };
}
