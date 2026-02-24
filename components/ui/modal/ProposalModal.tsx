"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const proposalSchema = z.object({
  description: z.string().min(20, "يجب أن يكون الوصف 20 حرفاً على الأقل"),
  price: z
    .number({ invalid_type_error: "أدخل سعراً صحيحاً" })
    .min(1, "السعر يجب أن يكون أكبر من 0"),
  duration: z
    .number({ invalid_type_error: "أدخل مدة صحيحة" })
    .min(1, "المدة يجب أن تكون أكبر من 0"),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProposalFormData) => void;
  isSubmitting?: boolean;
}

export default function ProposalModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ProposalModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: { price: 0, duration: 0 },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: ProposalFormData) => {
    onSubmit(data);
    reset();
  };

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
      onClick={handleClose}
    >
      {/* Modal box */}
      <div
        className="relative w-full max-w-lg mx-4 bg-white dark:bg-[#1a1f2e] rounded-2xl shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        dir="rtl"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          إرسال عرض
        </h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              وصف العرض <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="اشرح كيف ستنجز هذا المشروع..."
              className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#252b3b] text-gray-800 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.description && (
              <span className="text-red-500 text-xs">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Price & Duration */}
          <div className="flex gap-4">
            {/* Price */}
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                السعر المقترح (ريال) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                defaultValue={0}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#252b3b] text-gray-800 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              {errors.price && (
                <span className="text-red-500 text-xs">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                المدة المقترحة (يوم) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("duration", { valueAsNumber: true })}
                defaultValue={0}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#252b3b] text-gray-800 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              {errors.duration && (
                <span className="text-red-500 text-xs">
                  {errors.duration.message}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-primary text-white py-3 rounded-lg font-bold text-base hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "جاري الإرسال..." : "إرسال العرض"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border-2 border-primary text-primary py-3 rounded-lg font-bold text-base hover:bg-primary/5 transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
