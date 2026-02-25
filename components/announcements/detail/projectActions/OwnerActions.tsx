import EditIcon from "@/public/icons/EditIcon";
import TrashIcon from "@/public/icons/TrashIcon";

interface OwnerActionsProps {
  onEditProject: () => void;
  onDeleteProject: () => void;
}

/**
 * OwnerActions - Displays edit and delete buttons for the project owner.
 * Rendered inside the sidebar card in the new layout.
 */
export default function OwnerActions({
  onEditProject,
  onDeleteProject,
}: OwnerActionsProps) {
  return (
    <div className="bg-white rounded-xl  p-6 top-6">
      <h3 className="text-lg font-bold text-gray-dark mb-8 text-right">
        إدارة المشروع
      </h3>
      <div className="flex flex-col gap-3">
        <button
          onClick={onEditProject}
          className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold text-base hover:bg-primary/5 transition-colors"
        >
          <EditIcon className="w-5 h-5" />
          تعديل المشروع
        </button>
        <button
          onClick={onDeleteProject}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-bold text-base hover:bg-red-600 transition-colors"
        >
          <TrashIcon className="w-5 h-5" />
          حذف المشروع
        </button>
      </div>
    </div>
  );
}
