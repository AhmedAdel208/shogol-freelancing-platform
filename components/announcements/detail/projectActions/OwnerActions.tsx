import EditIcon from "@/public/icons/EditIcon";
import TrashIcon from "@/public/icons/TrashIcon";

interface OwnerActionsProps {
  onEditProject: () => void;
  onDeleteProject: () => void;
}

export default function OwnerActions({ onEditProject, onDeleteProject }: OwnerActionsProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={onEditProject}
        className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold text-lg hover:bg-primary/5 transition-colors"
      >
        <EditIcon className="w-5 h-5" />
        تعديل المشروع
      </button>
      <button
        onClick={onDeleteProject}
        className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors"
      >
        <TrashIcon className="w-5 h-5" />
        حذف المشروع
      </button>
    </div>
  );
}
