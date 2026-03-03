

import Image from "next/image";
import { Camera, Image as ImageIcon } from "lucide-react";

interface ProfileCoverSectionProps {
  coverImageUrl?: string;
}

export default function ProfileCoverSection({ coverImageUrl }: ProfileCoverSectionProps) {
  return (
    <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
            <ImageIcon size={20} />
          </div>
          صورة الغلاف
        </h2>
      </div>
      
      <div className="relative w-full aspect-21/9 sm:aspect-16/5 bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center group cursor-pointer ring-4 ring-transparent hover:ring-primary/10 transition-all border border-slate-100">
        {coverImageUrl ? (
          <Image 
            src={coverImageUrl} 
            alt="Cover" 
            fill 
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary/10" />
        )}
        
        <div className="relative z-10 flex flex-col items-center gap-3 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
            <Camera size={26} />
          </div>
          <span className="text-white font-bold text-sm bg-black/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
            {coverImageUrl ? 'تغيير صورة الغلاف' : 'إضافة صورة غلاف'}
          </span>
        </div>
      </div>
      <p className="text-center text-slate-400 text-sm font-bold mt-4">الأبعاد الموصى بها: 1920x400 بكسل (نسبة 16:9)</p>
    </section>
  );
}
