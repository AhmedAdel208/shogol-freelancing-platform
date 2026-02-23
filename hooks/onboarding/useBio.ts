"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { userService } from "@/lib/api/user";

export function useBio() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const MAX_CHARS = 500;

  const updateBioMutation = useMutation({
    mutationFn: (bioText: string) => userService.updateBio({ bio: bioText }),
    onSuccess: () => {
      router.push("/"); 
    },
    onError: (err: any) => {
      console.error("Error updating bio:", err);
      alert(err.message || "حدث خطأ أثناء حفظ النبذة التعريفية");
    }
  });

  const handleFinish = () => {
    if (bio.length < 10) {
      alert("النبذة التعريفية يجب أن تكون 10 أحرف على الأقل");
      return;
    }
    updateBioMutation.mutate(bio);
  };

  return {
    bio,
    setBio,
    MAX_CHARS,
    isSubmitting: updateBioMutation.isPending,
    handleFinish,
    remainingChars: MAX_CHARS - bio.length,
    progressPercentage: (bio.length / MAX_CHARS) * 100
  };
}
