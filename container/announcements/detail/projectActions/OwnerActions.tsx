import EditIcon from "@/public/icons/EditIcon";
import TrashIcon from "@/public/icons/TrashIcon";
import DeleteConfirmModal from "@/components/ui/modals/DeleteConfirmModal";
import { useState } from "react";

interface OwnerActionsProps {
  onEditProject: () => void;
  onDeleteProject: () => void;
  projectStatus?: string;
}

export default function OwnerActions({
  onEditProject,
  onDeleteProject,
  projectStatus,
}: OwnerActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col gap-6" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <h3 className="text-lg font-black text-gray-900 font-cairo">
            إدارة المشروع
          </h3>
        </div>

        {/* Status Warning */}
        {projectStatus === "InProgress" ? (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
            <span className="text-amber-500 text-lg mt-0.5">⚠️</span>
            <p className="text-amber-800 text-sm font-bold font-cairo leading-relaxed">
              لا يمكن تعديل أو حذف المشروع حالياً لأنه في مرحلة التنفيذ.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={onEditProject}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white border border-primary/20 hover:border-primary text-primary hover:bg-primary/5 rounded-xl font-bold font-cairo transition-all duration-300 active:scale-95 group/edit cursor-pointer"
            >
              <EditIcon className="w-5 h-5 transition-transform group-hover/edit:-rotate-12" />
              <span>تعديل المشروع</span>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-100 hover:border-red-500 rounded-xl font-bold font-cairo transition-all duration-300 active:scale-95 group/delete cursor-pointer"
            >
              <TrashIcon className="w-5 h-5 transition-transform group-hover/delete:scale-110" />
              <span>حذف المشروع</span>
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          onDeleteProject();
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
}
