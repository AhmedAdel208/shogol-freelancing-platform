


import { useState, useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/common/toast";
import { userService } from "@/lib/api/user";
import { useCoverImage } from "@/hooks/profile/useCoverImage";

interface ProfileCoverSectionProps {
  profileId?: string;
}

export default function ProfileCoverSection({  profileId }: ProfileCoverSectionProps) {
  const { data: fetchedCover } = useCoverImage(profileId || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (file: File) => userService.uploadCoverImage(file),
    onSuccess: () => {
      toast.success("تم تحديث صورة الغلاف بنجاح");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["cover-image", profileId] });
    },
    onError: () => {
      toast.error("فشل في تحميل صورة الغلاف");
    }
  });

  const handleContainerClick = () => {
    if (uploadMutation.isPending) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      uploadMutation.mutate(file);
    }
  };

  const resolvedFetchedCover = fetchedCover?.imageUrl || null;

  const displayImage = previewUrl || resolvedFetchedCover || null;

  return (
    <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      <div 
        onClick={handleContainerClick}
        className="relative w-full aspect-21/9 sm:aspect-16/5 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center group cursor-pointer ring-4 ring-transparent hover:ring-primary/10 transition-all border border-slate-100"
      >
        {displayImage ? (
          <Image 
            src={displayImage} 
            alt="Cover" 
            fill 
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/10" />
        )}
        
        <div className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-300 ${uploadMutation.isPending ? 'opacity-100' : 'opacity-90 group-hover:opacity-100 group-hover:scale-105'}`}>
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
            {uploadMutation.isPending ? (
              <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Camera size={26} />
            )}
          </div>
          <span className="text-white font-bold text-sm bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {uploadMutation.isPending ? 'جاري التحميل...' : (displayImage ? 'تغيير صورة الغلاف' : 'إضافة صورة غلاف')}
          </span>
        </div>
        
        {uploadMutation.isPending && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-5 transition-all" />
        )}
      </div>
      <p className="text-center text-slate-400 text-sm font-bold mt-4">الأبعاد الموصى بها: 1920x400 بكسل (نسبة 16:9)</p>
    </section>
  );
}
