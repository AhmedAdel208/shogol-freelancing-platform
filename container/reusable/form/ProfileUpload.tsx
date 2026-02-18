"use client";

import { useRef, useState } from "react";
import { Camera, X, Loader2 } from "lucide-react";
import Image from "next/image";
import ImageCropModal from "./ImageCropModal";
import type { ProfileUploadProps } from "@/types/profileUpload";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function ProfileUpload({
  onImageSelect,
  onImageRemove,
  defaultImage,
  maxSizeMB = 5,
}: ProfileUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const isLoading = useState(false)[0];
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

    // Create temp URL and open modal (don't set preview yet)
    const url = URL.createObjectURL(file);
    setTempImageUrl(url);
    setCropModalOpen(true);
    setError(null);
  };

  // Step 2: User confirms crop → Set preview and send to parent
  const handleCropConfirm = (croppedBlob: Blob) => {
    // Convert blob to file
    const croppedFile = new File([croppedBlob], "profile.jpg", {
      type: "image/jpeg",
    });

    // Create preview URL from cropped image
    const croppedUrl = URL.createObjectURL(croppedBlob);
    setPreview(croppedUrl);

    // Send to parent
    onImageSelect?.(croppedFile);

    // Close modal and cleanup
    setCropModalOpen(false);
    URL.revokeObjectURL(tempImageUrl);
    setTempImageUrl("");
  };

  // Step 3: User cancels crop → Cleanup
  const handleCropCancel = () => {
    setCropModalOpen(false);
    URL.revokeObjectURL(tempImageUrl);
    setTempImageUrl("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFileSelect(file);
    e.target.value = "";
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onImageRemove?.();
  };

  return (
    <>
      <div className="text-center mb-8">
        <p className="text-dark font-medium mb-4">الصورة الشخصية (اختياري)</p>

        <div className="relative w-32 h-32 mx-auto mb-4">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`
              relative w-full h-full rounded-full overflow-hidden
              transition-all duration-200
              ${
                preview
                  ? "ring-2 ring-gray-200 hover:ring-primary"
                  : "bg-gray-100 border-2 border-dashed border-gray-300 hover:border-primary"
              }
              ${error ? "ring-2 ring-red-400" : ""}
              ${isLoading ? "cursor-wait" : "cursor-pointer"}
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : preview ? (
              <>
                <Image
                  src={preview}
                  alt="الصورة الشخصية"
                  fill
                  sizes="128px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-xs text-gray-400 mt-1">إضافة صورة</span>
              </div>
            )}
          </button>

          {preview && !isLoading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1 -right-1 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md z-10"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_TYPES.join(",")}
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <p className="text-gray-medium text-xs">
          صيغ مدعومة: JPEG, PNG, GIF, WebP (الحد الأقصى {maxSizeMB}MB)
        </p>
      </div>

      {/* Crop Modal */}
      <ImageCropModal
        imageUrl={tempImageUrl}
        isOpen={cropModalOpen}
        onClose={handleCropCancel}
        onConfirm={handleCropConfirm}
      />
    </>
  );
}

export default ProfileUpload;
