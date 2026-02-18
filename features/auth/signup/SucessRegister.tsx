"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SucessRegisterProps } from "@/types/auth";

export default function SucessRegister({
  isOpen,
  onClose,
  userData,
  userImage,
}: SucessRegisterProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // Memoize the image URL to avoid recreating object URLs unnecessarily
  const imageUrl = useMemo(() => {
    if (!userImage) return null;
    return URL.createObjectURL(userImage);
  }, [userImage]);

  // Cleanup object URL when component unmounts or imageUrl changes
  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        router.push("/signup");
      }, 5000);

      const countdownTimer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownTimer);
        setCountdown(5);
      };
    }
  }, [isOpen, router]);

  // Sync the dialog open/close state with the isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Handle clicking the backdrop (outside the dialog content)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  // Handle native close event (e.g. pressing Escape)
  const handleDialogClose = () => {
    onClose();
  };

  const handleGoToVerify = () => {
    onClose();
    router.push("/verify");
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      className="
        backdrop:bg-black/50 backdrop:backdrop-blur-sm
        bg-transparent p-0 m-auto
        open:animate-[dialogFadeIn_0.3s_ease-out]
      "
    >
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-md p-8 text-center relative shadow-2xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <CheckCircle className="w-10 h-10 text-primary" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-dark mb-3">
          {userData?.accountType}
        </h3>

        {/* Message */}
        <p className="text-dark text-lg leading-relaxed mb-8">
          {userData?.email
            ? `تم إرسال رمز التحقق إلى ${userData.email}`
            : "تم إرسال رمز التحقق إلى بريدك الإلكتروني"}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoToVerify}
            className="w-full py-3.5 cursor-pointer bg-primary text-white rounded-xl text-lg font-semibold hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            التالي ({countdown}s)
          </button>
        </div>
      </div>
    </dialog>
  );
}
