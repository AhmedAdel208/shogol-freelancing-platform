// container/actions/EditProjectPage.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/lib/toast";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import {
  editProjectSchema,
  EditProjectFormData,
} from "@/lib/validation/editProjectSchema";
import { updateProjectService } from "@/lib/api/updateProject";
import FormField from "@/components/form/FormField";
import Button from "@/components/form/Button";
import { Save } from "lucide-react";
import { formatDeadlineForInput } from "@/utils/date";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  // Fetch real project data
  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: projectId,
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: 0,
      durationInDays: 30,
      deadline: "",
    },
  });

  // Update form data when project data is loaded
  useEffect(() => {
    if (project) {
      reset({
        title: project.title || "",
        description: project.description || "",
        budget: Number(project.budget) || 0,
        durationInDays: project.durationInDays || 30,
        deadline: formatDeadlineForInput(project.deadline),
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: EditProjectFormData) => {
    try {
      const result = await updateProjectService.updateProject(projectId, data);

      if (result.success) {
        toast.success(result.message);
        router.push(`/announcements/${projectId}`);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ غير متوقع");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">فشل تحميل المشروع</h2>
          <p className="text-gray-400 mb-4">
            حدث خطأ أثناء تحميل بيانات المشروع
          </p>
          <Button
            onClick={handleCancel}
            variant="primary"
            className="mx-auto cursor-pointer"
          >
            العودة
          </Button>
        </div>
      </main>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#1f2937] rounded-2xl p-6 space-y-6"
    >
      {/* Title */}
      <FormField
        label="عنوان المشروع"
        name="title"
        placeholder="أدخل عنوان المشروع"
        required
        register={register}
        error={errors.title?.message}
      />

      {/* Description */}
      <FormField
        label="وصف المشروع"
        name="description"
        type="textarea"
        placeholder="أدخل وصف تفصيلي للمشروع"
        required
        register={register}
        error={errors.description?.message}
        rows={5}
      />

      {/* Budget */}
      <FormField
        label="الميزانية (ريال)"
        name="budget"
        type="number"
        placeholder="أدخل الميزانية"
        required
        register={register}
        error={errors.budget?.message}
        min={1}
        max={1000000}
      />

      {/* Duration */}
      <FormField
        label="مدة المشروع (أيام)"
        name="durationInDays"
        type="number"
        placeholder="أدخل مدة المشروع بالأيام"
        required
        register={register}
        error={errors.durationInDays?.message}
        min={1}
        max={365}
      />

      {/* Deadline */}
      <FormField
        label="الموعد النهائي (اختياري)"
        name="deadline"
        type="date"
        register={register}
        error={errors.deadline?.message}
      />

      {/* Buttons */}
      <div className="flex gap-4 pt-4" dir="ltr">
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
          icon={Save}
          className="flex-1"
        >
          حفظ التغييرات
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          className="flex-1"
        >
          إلغاء
        </Button>
      </div>
    </form>
  );
}
