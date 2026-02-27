"use client";
import { FormInput } from "@/container/reusable/form";
import { X, Plus } from "lucide-react";
import { Skill } from "@/types/skills";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateProjectFormData } from "@/lib/validation/projectSchema";

interface StepOneProps {
  register: UseFormRegister<CreateProjectFormData>;
  errors: FieldErrors<CreateProjectFormData>;
  selectedSkills: Skill[];
  toggleSkill: (skill: Skill) => void;
  setIsModalOpen: (open: boolean) => void;
}

export default function StepOne({
  register,
  errors,
  selectedSkills,
  toggleSkill,
  setIsModalOpen,
}: StepOneProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
      {/* Project Title */}
      <div className="space-y-3 text-right">
        <label className="flex items-center justify-end gap-2 text-dark font-black font-cairo text-sm mr-1">
          عنوان الطلب <span className="text-primary">*</span>
        </label>
        <FormInput
          type="text"
          placeholder="على سبيل المثال: بناء موقع على شبكة الإنترنت"
          registration={register("title")}
          error={errors.title?.message}
          className="rounded-2xl border-gray-200 focus:ring-primary/20 focus:border-primary text-lg py-4 px-6 text-right"
        />
      </div>

      {/* Project Details */}
      <div className="space-y-3 text-right">
        <label className="flex items-center justify-end gap-2 text-dark font-black font-cairo text-sm mr-1">
          اكتب تفاصيل إعلانك <span className="text-primary">*</span>
        </label>
        <textarea
          {...register("description")}
          className={`w-full min-h-[180px] p-6 rounded-2xl border-2 transition-all duration-300 outline-hidden font-cairo text-lg resize-y text-right
            ${errors.description ? 'border-red-400 bg-red-50/30' : 'border-gray-100 bg-gray-50/30 focus:border-primary focus:bg-white'}`}
          placeholder="صف مشروعك هنا..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm font-bold font-cairo mr-2">{errors.description.message}</p>
        )}
      </div>

      {/* Skills Selection */}
      <div className="space-y-3 text-right">
        <label className="flex items-center justify-end gap-2 text-dark font-black font-cairo text-sm mr-1">
          المهارات <span className="text-primary">*</span>
        </label>
        <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 bg-gray-50/20 flex flex-col items-center">
          {selectedSkills.length === 0 ? (
            <p className="text-slate-400 font-cairo font-medium mb-6 text-center">لم يتم تحديد مهارات بعد</p>
          ) : (
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {selectedSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold font-cairo flex items-center gap-2"
                >
                  {skill.nameAr}
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="hover:text-red-500 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white border-2 border-primary/20 text-primary font-black font-cairo text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm cursor-pointer"
          >
            <Plus size={20} className="transition-transform group-hover:rotate-180" />
            تحديد المهارات
          </button>
        </div>
        {errors.skillIds && (
          <p className="text-red-500 text-sm font-bold font-cairo mr-2">{errors.skillIds.message}</p>
        )}
      </div>
    </div>
  );
}
