import { useState } from "react";
import ProposalModal from "@/components/ui/modals/ProposalModal";
import { useProposal } from "@/hooks/useProposal";
import {
  ProposalFormData,
  ProposalSubmitData,
} from "@/lib/validation/proposalSchema";
import { Send, CheckCircle2 } from "lucide-react";

interface FreelancerActionsProps {
  onSendMessage: () => void;
  jobRequestId: string;
  hasSubmittedProposal?: boolean;
  onProposalSuccess?: (proposalId: number) => void;
}

export default function FreelancerActions({
  onSendMessage,
  jobRequestId,
  hasSubmittedProposal,
  onProposalSuccess,
}: FreelancerActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const proposalMutation = useProposal();

  const handleProposalSubmit = (data: ProposalFormData) => {
    const submitData: ProposalSubmitData = {
      jobRequestId: Number(data.jobRequestId),
      description: data.description,
      proposedPrice: data.proposedPrice,
      proposedDurationInDays: data.proposedDurationInDays,
    };

    proposalMutation.mutate(submitData, {
      onSuccess: (response) => {
        onProposalSuccess?.(response.proposalId);
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {hasSubmittedProposal ? (
          <button
            disabled
            className="relative w-full overflow-hidden rounded-[16px] font-bold font-cairo text-base shadow-sm ring-1 ring-emerald-200/50 bg-emerald-50 text-emerald-600 py-4 opacity-90 cursor-not-allowed flex items-center justify-center gap-2.5"
          >
            <CheckCircle2 size={22} strokeWidth={2.5} />
            <span className="mb-px">تم إرسال عرضك بنجاح</span>
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="relative w-full cursor-pointer overflow-hidden rounded-[16px] font-bold font-cairo text-base group/submit shadow-xl shadow-primary/20 transition-all duration-300 hover:shadow-primary/30 active:scale-[0.98]"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-linear-to-r from-primary via-teal-400 to-primary bg-size-[200%_auto] animate-[gradient_3s_linear_infinite] group-hover/submit:bg-size-[100%_auto] transition-all duration-500" />
            
            <div className="relative flex items-center justify-center gap-2.5 py-4 px-6 text-white bg-black/5">
              <Send size={20} strokeWidth={2.5} className="group-hover/submit:-translate-y-0.5 group-hover/submit:translate-x-0.5 transition-transform duration-300" />
              <span className="mb-px text-[17px] tracking-wide text-shadow-sm">إرسال عرض الآن</span>
            </div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover/submit:animate-[shimmer_1.5s_infinite] pointer-events-none" />
          </button>
        )}
      </div>

      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProposalSubmit}
        isSubmitting={proposalMutation.isPending}
        jobRequestId={Number(jobRequestId)}
      />
    </>
  );
}
