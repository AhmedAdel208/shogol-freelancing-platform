import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { UseSuccessRedirectProps } from "@/types/auth";

export function useSuccessRedirect({
  isOpen,
  onClose,
  redirectUrl,
  delay = 5000,
  userImage,
}: UseSuccessRedirectProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(delay / 1000);

  const imageUrl = useMemo(() => {
    if (!userImage) return null;
    return URL.createObjectURL(userImage);
  }, [userImage]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        router.push(redirectUrl);
      }, delay);

      const countdownTimer = setInterval(() => {
        setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownTimer);
        setCountdown(delay / 1000);
      };
    }
  }, [isOpen, router, onClose, redirectUrl, delay]);

  return { countdown, imageUrl };
}
