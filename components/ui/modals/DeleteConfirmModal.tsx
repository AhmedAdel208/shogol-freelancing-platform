import { Trash2 } from "lucide-react";
import { DeleteConfirmModalProps } from "@/types/modals";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "تأكيد الحذف",
  message = "هل أنت متأكد من حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء",
  confirmText = "نعم، احذف",
  cancelText = "إلغاء",
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-8 text-center">
        {/* Trash Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-10 h-10 text-red-500" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-dark mb-4">{title}</h3>

        {/* Message */}
        <p className="text-gray-medium  mb-6 leading-relaxed">{message}</p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-red-500 cursor-pointer text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-primary text-primary cursor-pointer rounded-xl font-bold hover:bg-primary/5 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
