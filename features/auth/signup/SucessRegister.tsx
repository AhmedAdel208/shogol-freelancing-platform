"use client";

import { useRef, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSuccessRedirect } from "@/hooks/useSuccessRedirect";
import { SucessRegisterProps } from "@/types/auth";

export default function SucessRegister({
  isOpen,
  onClose,
  userData,
  userImage,
}: SucessRegisterProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const redirectUrl = (() => {
    const params = new URLSearchParams();
    if (userData?.email) params.set("email", userData.email);
    if (userData?.phone) params.set("phone", userData.phone);
    const queryString = params.toString();
    return `/verify${queryString ? `?${queryString}` : ""}`;
  })();

  const { countdown, imageUrl } = useSuccessRedirect({
    isOpen,
    onClose,
    redirectUrl,
    userImage,
  });

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
    router.push(redirectUrl);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleDialogClose}
      onClick={handleBackdropClick}
      className="
        backdrop:bg-black/50 backdrop:backdrop-blur-sm
        bg-transparent p-0 m-auto overflow-hidden
        open:animate-in open:fade-in open:zoom-in-95 duration-300
      "
    >
      <div className="bg-white rounded-3xl w-[90vw] max-w-md p-10 text-center relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-inner">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <CheckCircle className="w-12 h-12 text-primary" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-dark mb-4">
          تم إنشاء الحساب بنجاح!
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-lg leading-relaxed mb-10 px-4">
          {userData?.email
            ? `تم إرسال رمز التحقق إلى بريدك الإلكتروني`
            : "تم إرسال رمز التحقق لتأكيد حسابك"}
          <br />
          <span className="text-primary font-bold mt-2 block">{userData?.email}</span>
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleGoToVerify}
            className="w-full py-4 cursor-pointer bg-primary text-white rounded-2xl text-lg font-bold hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-primary/25"
          >
            التحقق من الرمز ({countdown}s)
          </button>
        </div>
      </div>
    </dialog>
  );
}
