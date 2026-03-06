import { Send, CheckCircle2 } from "lucide-react";

interface FreelancerActionsProps {
  onSendMessage: () => void;
  jobRequestId: string;
  hasSubmittedProposal?: boolean;
  onShowForm?: () => void;
  onProposalSuccess?: (proposalId: number) => void;
}

export default function FreelancerActions({
  jobRequestId,
  hasSubmittedProposal,
  onShowForm,
}: FreelancerActionsProps) {
  const handleClick = () => {
    if (onShowForm) {
      onShowForm();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {hasSubmittedProposal ? (
        <div
          className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-bold font-cairo"
        >
          <CheckCircle2 size={20} strokeWidth={2.5} />
          <span>تم إرسال عرضك بنجاح</span>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="w-full relative flex items-center justify-center gap-3 py-4 px-6 bg-primary hover:bg-[#168a8d] text-white rounded-xl font-bold font-cairo text-lg shadow-lg shadow-primary/10 transition-all duration-300 active:scale-[0.98] group/submit cursor-pointer"
        >
          <Send
            size={20}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover/submit:-translate-y-0.5 group-hover/submit:translate-x-0.5"
          />
          <span className="mb-px tracking-wide">
            إرسال عرض الآن
          </span>
        </button>
      )}
    </div>
  );
}
