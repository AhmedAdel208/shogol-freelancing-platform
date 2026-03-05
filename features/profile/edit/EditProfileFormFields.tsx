

import { User, FileText, Layers, Globe } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ProfileUpdateFormData } from "@/lib/validation/profileUpdateSchema";
import { NATIONALITY_OPTIONS } from "@/data/nationalityOptions";

interface EditProfileFormFieldsProps {
  register: UseFormRegister<ProfileUpdateFormData>;
  errors: FieldErrors<ProfileUpdateFormData>;
}

export default function EditProfileFormFields({ register, errors }: EditProfileFormFieldsProps) {
  return (
    <div className="space-y-10">
      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-700 flex items-center gap-2">
            <User size={14} className="text-slate-400" />
            الاسم الأول <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("firstName")}
            className={`w-full bg-slate-50/50 border rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 ${
              errors.firstName ? "border-rose-300 ring-rose-50" : "border-slate-200"
            }`}
            placeholder="الاسم الأول"
          />
          {errors.firstName && (
            <p className="text-rose-500 text-[11px] font-bold mr-2">{errors.firstName.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-700 flex items-center gap-2">
            <User size={14} className="text-slate-400" />
            الاسم الأخير <span className="text-rose-500">*</span>
          </label>
          <input
            {...register("lastName")}
            className={`w-full bg-slate-50/50 border rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 ${
              errors.lastName ? "border-rose-300 ring-rose-50" : "border-slate-200"
            }`}
            placeholder="الاسم الأخير"
          />
          {errors.lastName && (
            <p className="text-rose-500 text-[11px] font-bold mr-2">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Bio Field */}
      <div className="space-y-2">
        <label className="text-sm font-black text-slate-700 flex items-center gap-2">
          <FileText size={14} className="text-slate-400" />
          نبذة عني
        </label>
        <textarea
          {...register("bio")}
          rows={4}
          className={`w-full bg-slate-50/50 border rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 resize-none leading-relaxed ${
            errors.bio ? "border-rose-300 ring-rose-50" : "border-slate-200"
          }`}
          placeholder="اكتب نبذة مختصرة عنك وعن مجالك..."
        />
        {errors.bio && (
          <p className="text-rose-500 text-[11px] font-bold mr-2">{errors.bio.message}</p>
        )}
      </div>

      {/* Select Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-700 flex items-center gap-2">
            <Layers size={14} className="text-slate-400" />
            النوع
          </label>
          <select
            {...register("gender")}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 cursor-pointer appearance-none"
          >
            <option value="Male">ذكر</option>
            <option value="Female">أنثى</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-700 flex items-center gap-2">
            <Globe size={14} className="text-slate-400" />
            الجنسية
          </label>
          <select
            {...register("nationality")}
            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 py-4 font-bold text-slate-900 outline-none transition-all focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 cursor-pointer appearance-none"
          >
            {NATIONALITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.label}>
                {option.label}
              </option>
            ))}
            <option value="أخرى">أخرى</option>
          </select>
        </div>
      </div>
    </div>
  );
}
