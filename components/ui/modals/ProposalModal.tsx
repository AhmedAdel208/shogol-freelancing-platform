"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proposalSchema,
  type ProposalFormData,
} from "@/lib/validation/proposalSchema";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProposalFormData) => void;
  isSubmitting?: boolean;
  jobRequestId: number;
}

export default function ProposalModal({
  isOpen,
  onClose,
  onSubmit,
  jobRequestId,
  isSubmitting = false,
}: ProposalModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      jobRequestId: jobRequestId,
      description: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: ProposalFormData) => {
    console.log("ProposalModal - form submitted with data:", data);
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
        className="relative w-full max-w-lg mx-4 bg-white  rounded-2xl shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        dir="rtl"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-dark  mb-6">
          إرسال عرض
        </h2>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-dark ">
              وصف العرض <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description")}
              rows={5}
              placeholder="اشرح كيف ستنجز هذا المشروع..."
              className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 text-black p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Price & Duration */}
          <div className="flex gap-4">
            {/* Price */}
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium text-dark ">
                السعر المقترح (ريال) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                {...register("proposedPrice", { valueAsNumber: true })}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-gray-50  text-gray-800  p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              {errors.proposedPrice && (
                <span className="text-red-500 text-xs">
                  {errors.proposedPrice.message}
                </span>
              )}
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                المدة المقترحة (يوم) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                {...register("proposedDurationInDays", { valueAsNumber: true })}
                placeholder="0"
                className="w-full rounded-lg border border-gray-300 bg-gray-50  text-gray-800  p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              {errors.proposedDurationInDays && (
                <span className="text-red-500 text-xs">
                  {errors.proposedDurationInDays.message}
                </span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
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
