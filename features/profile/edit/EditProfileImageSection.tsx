

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import { useUploadProfilePicture } from "@/hooks/profile/useProfile";
import ImageCropModal from "@/container/reusable/form/ImageCropModal";

interface EditProfileImageSectionProps {
  profilePictureUrl: string | null;
}

export default function EditProfileImageSection({ profilePictureUrl }: EditProfileImageSectionProps) {
  const { mutate: uploadProfilePic, isPending: isUploadingProfile } = useUploadProfilePicture();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [cropModalInfo, setCropModalInfo] = useState<{ isOpen: boolean; imageUrl: string }>({
    isOpen: false,
    imageUrl: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropModalInfo({
          isOpen: true,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
      
   
      e.target.value = "";
    }
  };

  const handleCropConfirm = (croppedBlob: Blob) => {
    // Convert blob to File object for the upload mutation
    const file = new File([croppedBlob], "profile-picture.jpg", { type: "image/jpeg" });
    uploadProfilePic(file);
    setCropModalInfo({ isOpen: false, imageUrl: "" });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="w-26 h-26 relative bg-slate-100 rounded-full flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm border border-slate-200">
          <Image 
            src={profilePictureUrl || "/images/avatar-placeholder.png"} 
            alt="Profile" 
            fill 
            className="object-cover" 
          />
          {isUploadingProfile && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 shadow-inner">
              <Loader2 size={24} className="text-white animate-spin" />
            </div>
          )}
        </div>
        
        {/* Camera Overlay Button */}
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploadingProfile}
          className="absolute bottom-0 right-0 w-8 h-8 bg-[#14b8a6] text-white rounded-full flex items-center justify-center border-2 border-white hover:bg-teal-600 hover:scale-110 transition-all z-10 cursor-pointer shadow-sm disabled:opacity-50"
        >
          <Camera size={14} />
        </button>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />
      
      <p className="text-slate-400 text-xs font-bold mt-4 font-cairo opacity-80">اضغط على أيقونة الكاميرا لتغيير الصورة</p>

      {/* Image Cropping Modal */}
      <ImageCropModal
        isOpen={cropModalInfo.isOpen}
        imageUrl={cropModalInfo.imageUrl}
        onClose={() => setCropModalInfo({ isOpen: false, imageUrl: "" })}
        onConfirm={handleCropConfirm}
      />
    </div>
  );
}
