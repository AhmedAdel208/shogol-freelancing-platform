import { useState, useRef } from "react";
import { UseProfileUploadProps } from "@/types/profileUpload";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export function useProfileUpload({
  onImageSelect,
  onImageRemove,
  maxSizeMB = 5,
}: UseProfileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const maxSize = maxSizeMB * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) return "صيغة الملف غير مدعومة";
    if (file.size > maxSize) return `الحد الأقصى ${maxSizeMB} ميجابايت`;
    return null;
  };

  const handleFileSelect = (file: File) => {
    const errorMsg = validateFile(file);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    const url = URL.createObjectURL(file);
    setTempImageUrl(url);
    setCropModalOpen(true);
    setError(null);
  };

  const handleCropConfirm = (croppedBlob: Blob) => {
    const croppedFile = new File([croppedBlob], "profile.jpg", {
      type: "image/jpeg",
    });

    const croppedUrl = URL.createObjectURL(croppedBlob);
    setPreview(croppedUrl);
    onImageSelect?.(croppedFile);

    setCropModalOpen(false);
    if (tempImageUrl) URL.revokeObjectURL(tempImageUrl);
    setTempImageUrl("");
  };

  const handleCropCancel = () => {
    setCropModalOpen(false);
    if (tempImageUrl) URL.revokeObjectURL(tempImageUrl);
    setTempImageUrl("");
  };

  const removeImage = () => {
    setPreview(null);
    setError(null);
    onImageRemove?.();
  };

  return {
    preview,
    error,
    setError,
    cropModalOpen,
    tempImageUrl,
    inputRef,
    handleFileSelect,
    handleCropConfirm,
    handleCropCancel,
    removeImage,
  };
}
