"use client";

import { Trash2, AlertCircle, X } from "lucide-react";
import { DeleteConfirmModalProps } from "@/types/modals";
import { useEffect, useState } from "react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "تأكيد حذف المشروع",
  message = "هل أنت متأكد من رغبتك في حذف هذا المشروع؟ يرجى العلم أنه لا يمكن التراجع عن هذا الإجراء بعد مراجعته.",
  confirmText = "نعم، احذف المشروع",
  cancelText = "إلغاء الأمر",
}: DeleteConfirmModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !isMounted) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
      {/* SOLID Backdrop with heavy blur */}
      <div 
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />

      {/* SOLID Modal Box */}
      <div 
        className="relative w-full max-w-md bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border-4 border-white overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-12 duration-500 opacity-100 px-8 py-10 text-center ring-1 ring-slate-200" 
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon */}
        <div className="w-24 h-24 bg-rose-50 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-inner border border-rose-100 group">
          <Trash2 className="w-12 h-12 text-rose-500 group-hover:rotate-12 transition-transform duration-500" />
        </div>

        {/* Content */}
        <div className="space-y-3 mb-10">
          <h3 className="text-2xl font-black text-slate-900 font-cairo tracking-tight">{title}</h3>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
             <AlertCircle size={20} className="text-rose-400 shrink-0 mt-0.5" />
             <p className="text-slate-600 text-[15px] font-bold font-cairo leading-relaxed text-right">
               {message}
             </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <button
            onClick={onConfirm}
            className="w-full relative overflow-hidden bg-rose-500 text-white py-4.5 rounded-[22px] font-black font-cairo text-base shadow-xl shadow-rose-200 cursor-pointer hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 group/del"
          >
            <span className="relative z-10">{confirmText}</span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/del:animate-[shimmer_2s_infinite] pointer-events-none" />
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-slate-100 text-slate-500 py-4.5 rounded-[22px] font-black font-cairo text-base hover:bg-slate-200 hover:text-slate-800 transition-all active:scale-[0.97] cursor-pointer"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
