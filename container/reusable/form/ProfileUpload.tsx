
import { Camera, X} from "lucide-react";
import Image from "next/image";
import { useProfileUpload } from "@/hooks/auth/useProfileUpload";
import ImageCropModal from "./ImageCropModal";
import type { ProfileUploadProps } from "@/types/profileUpload";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

function ProfileUpload({
  onImageSelect,
  onImageRemove,
  maxSizeMB = 5,
}: ProfileUploadProps) {
  const {
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
  } = useProfileUpload({
    onImageSelect,
    onImageRemove,
    maxSizeMB,
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleFileSelect(file);
    e.target.value = "";
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
              cursor-pointer
            `}
          >
            {preview ? (
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

          {preview && (
            <button
              type="button"
              onClick={removeImage}
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
