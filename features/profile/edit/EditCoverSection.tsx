

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Image as ImageIcon, Loader2 } from "lucide-react";
import { useUploadCoverImage } from "@/hooks/profile/useProfile";
import ImageCropModal from "@/container/reusable/form/ImageCropModal";

interface EditCoverSectionProps {
  coverImageUrl: string | null;
}

export default function EditCoverSection({ coverImageUrl }: EditCoverSectionProps) {
  const { mutate: uploadCover, isPending: isUploadingCover } = useUploadCoverImage();
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [cropModalInfo, setCropModalInfo] = useState<{ isOpen: boolean; imageUrl: string }>({
    isOpen: false,
    imageUrl: "",
  });

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const file = new File([croppedBlob], "cover-image.jpg", { type: "image/jpeg" });
    uploadCover(file);
    setCropModalInfo({ isOpen: false, imageUrl: "" });
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-black text-slate-700 font-cairo flex items-center gap-2">
        <ImageIcon size={18} className="text-slate-400" />
        صورة الغلاف
      </label>
      <div 
        onClick={() => coverInputRef.current?.click()}
        className="relative w-full aspect-21/9 sm:aspect-4/1 bg-slate-900 rounded-[24px] overflow-hidden flex items-center justify-center group cursor-pointer border-2 border-slate-100 hover:border-primary/50 transition-colors"
      >
        {coverImageUrl ? (
           <Image 
             src={coverImageUrl} 
             alt="Cover" 
             fill 
             className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
           />
        ) : (
           <div className="absolute inset-0 bg-slate-900" />
        )}
        
        <div className="relative z-10 flex items-center gap-2 bg-white px-5 py-3 rounded-2xl shadow-lg border border-slate-100 group-hover:scale-105 transition-transform duration-300">
           {isUploadingCover ? (
             <Loader2 size={16} className="text-primary animate-spin" />
           ) : (
             <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Camera size={16} />
             </div>
           )}
           <span className="font-bold text-slate-800 text-sm">
             {isUploadingCover ? "جاري التحميل..." : "تغيير صورة الغلاف"}
           </span>
        </div>
      </div>
      <input 
        type="file" 
        ref={coverInputRef} 
        onChange={handleCoverUpload} 
        className="hidden" 
        accept="image/*" 
      />
      <p className="text-center text-slate-400 text-xs font-bold">الأبعاد الموصى بها: 1920x400 بكسل (نسبة 21:9)</p>

      {/* Cover Image Cropping Modal */}
      <ImageCropModal
        isOpen={cropModalInfo.isOpen}
        imageUrl={cropModalInfo.imageUrl}
        onClose={() => setCropModalInfo({ isOpen: false, imageUrl: "" })}
        onConfirm={handleCropConfirm}
        aspect={21 / 9}
        cropShape="rect"
        title="قص صورة الغلاف"
      />
    </div>
  );
}
