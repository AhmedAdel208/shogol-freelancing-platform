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
      <div className="bg-white rounded-xl  p-6 top-6">
        <h3 className="text-lg font-bold text-gray-dark mb-8 text-right">
          إدارة المشروع
        </h3>

        {/* Show warning when project is in progress (proposal accepted) */}
        {projectStatus === "InProgress" ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800  text-right">
              لا يمكن تعديل أو حذف المشروع تم قبول عرض لهذا المشروع. ⚠️
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <button
              onClick={onEditProject}
              className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold text-base cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <EditIcon className="w-5 h-5" />
              تعديل المشروع
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-full flex items-center cursor-pointer justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-bold text-base hover:bg-red-600 transition-colors"
            >
              <TrashIcon className="w-5 h-5" />
              حذف المشروع
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
