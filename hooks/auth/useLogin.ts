"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api/auth";
import { loginSchema, type LoginFormData } from "@/lib/validation/loginSchema";

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
      // Assuming the API returns a token and we might want to store it
      if (data.token) {
        localStorage.setItem("token", data.token);
        // Dispatch storage event to trigger auth state update
        window.dispatchEvent(new Event("storage"));
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
