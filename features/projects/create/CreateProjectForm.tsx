"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  FormInput, 
  Button, 
} from "@/container/reusable/form";
import { 
  CalendarDays, 
  Plus, 
  Paperclip, 
  Send,
  Sparkles,
  Loader2,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { jobRequestService } from "@/lib/api/jobRequests";
import { skillsService } from "@/lib/api/skills";
import { Skill } from "@/types/skills";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SkillsModal from "./SkillsModal";

const createProjectSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان الطلب مطلوب")
    .min(5, "يجب أن يكون العنوان 5 أحرف على الأقل"),
  description: z
    .string()
    .min(1, "تفاصيل الإعلان مطلوبة")
    .min(10, "يجب أن تكون التفاصيل 10 حروفاً على الأقل"),
  budget: z.coerce.number().min(1, "السعر مطلوب"),
  duration: z.coerce.number().min(1, "المدة مطلوبة"),
  deadline: z.string().min(1, "الموعد النهائي مطلوب"),
  skillIds: z.array(z.number()).min(1, "يجب تحديد مهارة واحدة على الأقل"),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export default function CreateProjectForm() {
  const router = useRouter();
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      skillIds: [],
    },
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillsService.getSkills();
        const allSkills = response.categories.flatMap(cat => cat.skills);
        setAvailableSkills(allSkills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
        toast.error("فشل تحميل المهارات");
      } finally {
        setIsDataLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const onSubmit = async (data: CreateProjectFormData) => {
    try {
      const formData = new FormData();
      formData.append("Title", data.title);
      formData.append("Description", data.description);
      formData.append("Budget", data.budget.toString());
      formData.append("DurationInDays", data.duration.toString());
      
      const deadlineDate = new Date(data.deadline);
      formData.append("Deadline", deadlineDate.toISOString());

      data.skillIds.forEach(id => {
        formData.append("SkillIds", id.toString());
      });

      files.forEach(file => {
        formData.append("Attachments", file);
      });

      await jobRequestService.createJobRequest(formData);
      toast.success("تم نشر طلبك بنجاح!");
      router.push("/announcements");
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "فشل إرسال الطلب");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const toggleSkill = (skill: Skill) => {
    const isSelected = selectedSkills.some(s => s.id === skill.id);
    let newSelected: Skill[];
    if (isSelected) {
      newSelected = selectedSkills.filter(s => s.id !== skill.id);
    } else {
      newSelected = [...selectedSkills, skill];
    }
    setSelectedSkills(newSelected);
    setValue("skillIds", newSelected.map(s => s.id), { shouldValidate: true });
  };

  if (isDataLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black font-cairo text-dark mb-4 drop-shadow-sm">
          طلب عرض للسعر..
        </h1>
        <p className="text-gray-500 font-cairo text-lg max-w-2xl mx-auto leading-relaxed">
          هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز
        </p>
      </div>

      {/* Main Form Card */}
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-[40px] shadow-[0_20px_70px_-10px_rgba(30,170,173,0.12)] border border-gray-100 p-8 md:p-12 space-y-10 relative"
      >
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
                  {...register("budget")}
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
                  {...register("duration")}
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
                 {selectedSkills.map(skill => (
                   <span key={skill.id} className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-sm font-bold font-cairo flex items-center gap-2">
                      {skill.nameAr}
                      <button type="button" onClick={() => toggleSkill(skill)} className="hover:text-red-500 cursor-pointer">
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
                    <button type="button" onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                      <X size={14} />
                    </button>
                    <span className="text-xs font-bold text-gray-500 truncate max-w-[150px]">{file.name}</span>
                    <Paperclip size={12} className="text-primary" />
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full relative overflow-hidden group py-6 rounded-3xl"
          >
            <div className={`absolute inset-0 bg-linear-to-r from-primary via-teal-400 to-primary bg-size-[200%_auto] transition-all group-hover:bg-size-[100%_auto] ${isSubmitting ? '' : 'animate-[gradient_3s_linear_infinite]'}`} />
            <div className="relative flex items-center justify-center gap-3 font-black font-cairo text-xl text-white">
              {isSubmitting ? "جاري الإرسال..." : "إرسال"}
              {!isSubmitting && <Send size={20} className="rotate-180 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              {isSubmitting && <Loader2 size={24} className="animate-spin" />}
            </div>
          </Button>
          
          <div className="flex justify-center gap-4 mt-6">
             <div className="flex items-center gap-1.5 text-gray-400">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-xs font-bold font-cairo">تحقق من بياناتك قبل الإرسال</span>
             </div>
          </div>
        </div>
      </form>

      {/* Skills Selection Modal */}
      <SkillsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableSkills={availableSkills}
        selectedSkillIds={watch("skillIds")}
        onToggleSkill={toggleSkill}
        onConfirm={() => setIsModalOpen(false)}
      />
    </div>
  );
}
