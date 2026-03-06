"use client";

import { useState, useRef, useEffect } from "react";
import { X, Upload, Image as ImageIcon, Link as LinkIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { portfolioSchema, type PortfolioFormData } from "@/lib/validation/portfolioSchema";
import { useAddPortfolio } from "@/hooks/profile/useUserPortfolios";
import Image from "next/image";

interface AddPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPortfolioModal({ isOpen, onClose }: AddPortfolioModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { mutate: addPortfolio, isPending: isAdding } = useAddPortfolio();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      title: "",
      description: "",
      projectUrl: "",
    }
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile instanceof File) {
      const url = URL.createObjectURL(imageFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file, { shouldValidate: true });
    }
  };

  const handleClose = () => {
    reset();
    setPreviewUrl(null);
    onClose();
  };

  const onSubmit = (data: PortfolioFormData) => {
    const formData = new FormData();
    formData.append("Image", data.image);
    formData.append("Title", data.title);
    if (data.description) formData.append("Description", data.description);
    if (data.projectUrl) formData.append("ProjectUrl", data.projectUrl);

    addPortfolio(formData, {
      onSuccess: () => handleClose()
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xl font-black text-slate-900 font-cairo">إضافة عمل جديد</h3>
          <button 
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form id="portfolio-form" onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
          
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 font-cairo block">
              صورة المشروع <span className="text-rose-500">*</span>
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl overflow-hidden transition-all cursor-pointer group h-52 flex flex-col items-center justify-center
                ${previewUrl ? 'border-primary bg-white' : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-primary/50'}
                ${errors.image ? 'border-rose-300 bg-rose-50/30' : ''}
              `}
            >
              {previewUrl ? (
                <>
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Upload size={32} className="text-white" />
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon size={32} className="text-slate-300" />
                  </div>
                  <p className="text-sm font-black text-slate-600 font-cairo">اضغط لاختيار صورة</p>
                  <p className="text-[11px] text-slate-400 font-bold mt-1 uppercase">PNG, JPG, JPEG (Max 5MB)</p>
                </div>
              )}
            </div>
            {errors.image?.message && (
              <p className="text-[11px] font-bold text-rose-500 font-cairo mr-2">{String(errors.image.message)}</p>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 font-cairo block">
              عنوان المشروع <span className="text-rose-500">*</span>
            </label>
            <input 
              type="text"
              {...register("title")}
              placeholder="مثال: متجر إلكتروني متكامل"
              className={`w-full bg-slate-50/50 border rounded-2xl py-4 px-6 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-bold transition-all font-cairo ${
                errors.title ? 'border-rose-200' : 'border-slate-100'
              }`}
            />
            {errors.title?.message && (
              <p className="text-[11px] font-bold text-rose-500 font-cairo mr-2">{String(errors.title.message)}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 font-cairo block">
              وصف المشروع
            </label>
            <textarea
              {...register("description")}
              placeholder="اشرح تفاصيل المشروع، التقنيات المستخدمة، ودورك فيه..."
              className="w-full min-h-[120px] bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-bold transition-all resize-none leading-relaxed font-cairo"
            />
          </div>

          {/* Project URL */}
          <div className="space-y-2">
            <label className="text-sm font-black text-slate-700 font-cairo block">
              رابط المشروع
            </label>
            <div className="relative group">
              <LinkIcon className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text"
                {...register("projectUrl")}
                placeholder="https://example.com"
                className={`w-full bg-slate-50/50 border rounded-2xl py-4 pr-14 pl-6 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-bold transition-all font-cairo ltr ${
                  errors.projectUrl ? 'border-rose-200' : 'border-slate-100'
                }`}
              />
            </div>
            {errors.projectUrl?.message && (
              <p className="text-[11px] font-bold text-rose-500 font-cairo mr-2">{String(errors.projectUrl.message)}</p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-4 bg-slate-50/50">
          <button 
            type="submit"
            form="portfolio-form"
            disabled={isAdding}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-black font-cairo hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:hover:shadow-none flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <span>إضافة المشروع</span>
            )}
          </button>
          <button 
             type="button"
             onClick={handleClose}
             className="px-8 bg-white border border-slate-200 text-slate-600 py-4 rounded-2xl font-black font-cairo hover:bg-slate-50 transition-all"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
}
