"use client";
import { CalendarDays, Paperclip, X } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateProjectFormData } from "@/lib/validation/projectSchema";

interface StepTwoProps {
  register: UseFormRegister<CreateProjectFormData>;
  errors: FieldErrors<CreateProjectFormData>;
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
}

export default function StepTwo({
  register,
  errors,
  files,
  handleFileChange,
  removeFile,
}: StepTwoProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-500">
      {/* Price and Duration Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" dir="rtl">
        {/* Price */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-dark font-black font-cairo text-sm mr-1">
            السعر <span className="text-primary">*</span>
          </label>
          <div className="flex bg-gray-50/50 rounded-2xl border-2 border-gray-100 focus-within:border-primary focus-within:bg-white transition-all overflow-hidden">
            <input
              type="number"
              {...register("budget", { valueAsNumber: true })}
              className="flex-1 bg-transparent py-4 px-6 font-cairo text-lg outline-hidden text-right"
              placeholder="0"
            />
            <div className="bg-white border-r border-gray-100 px-6 py-4 flex items-center font-black font-cairo text-gray-400">
              ريال
            </div>
          </div>
          {errors.budget && (
            <p className="text-red-500 text-sm font-bold font-cairo mr-2">{errors.budget.message}</p>
          )}
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-dark font-black font-cairo text-sm mr-1">
            المدة <span className="text-primary">*</span>
          </label>
          <div className="flex bg-gray-50/50 rounded-2xl border-2 border-gray-100 focus-within:border-primary focus-within:bg-white transition-all overflow-hidden">
            <input
              type="number"
              {...register("duration", { valueAsNumber: true })}
              className="flex-1 bg-transparent py-4 px-6 font-cairo text-lg outline-hidden text-right"
              placeholder="0"
            />
            <div className="bg-white border-r border-gray-100 px-6 py-4 flex items-center font-black font-cairo text-gray-400">
              يوم
            </div>
          </div>
          {errors.duration && (
            <p className="text-red-500 text-sm font-bold font-cairo mr-2">{errors.duration.message}</p>
          )}
        </div>
      </div>

      {/* Deadline */}
      <div className="space-y-3 text-right">
        <label className="flex items-center justify-end gap-2 text-dark font-black font-cairo text-sm mr-1">
          الموعد النهائي
        </label>
        <div className="relative flex items-center bg-gray-50/30 rounded-2xl border-2 border-gray-100 focus-within:border-primary focus-within:bg-white transition-all px-5 py-0.5 flex-row-reverse">
          <input
            type="date"
            {...register("deadline")}
            className="w-full bg-transparent py-4 font-cairo text-lg outline-hidden appearance-none text-right"
          />
          <CalendarDays size={20} className="text-gray-400 ml-4" />
        </div>
        {errors.deadline && (
          <p className="text-red-500 text-sm font-bold font-cairo mr-2">{errors.deadline.message}</p>
        )}
      </div>

      {/* File Upload */}
      <div className="space-y-3 text-right">
        <label className="flex items-center justify-end gap-2 text-dark font-black font-cairo text-sm mr-1">
          الملفات
        </label>
        <div className="group relative border-2 border-dashed border-gray-200 rounded-3xl p-8 transition-all hover:border-primary/40 hover:bg-primary/5 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-all shadow-sm">
              <Paperclip size={24} className="text-gray-400 group-hover:text-primary" />
            </div>
            <span className="text-slate-400 font-bold font-cairo text-sm">اضغط لتحميل الملفات</span>
          </div>
        </div>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-end mt-4">
            {files.map((file, idx) => (
              <div key={idx} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-gray-400 hover:text-red-500 cursor-pointer"
                >
                  <X size={14} />
                </button>
                <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{file.name}</span>
                <Paperclip size={12} className="text-primary" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
