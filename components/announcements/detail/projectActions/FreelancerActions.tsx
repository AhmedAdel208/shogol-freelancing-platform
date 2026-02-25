import { useState } from "react";
import MailIcon from "@/public/icons/MailIcon";
import ProposalModal from "@/components/ui/modals/ProposalModal";
import { useProposal } from "@/hooks/useProposal";
import { ProposalFormData } from "@/lib/validation/proposalSchema";

interface FreelancerActionsProps {
  onSendMessage: () => void;
  jobRequestId: number;
}

export default function FreelancerActions({
  onSendMessage,
  jobRequestId,
}: FreelancerActionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const proposalMutation = useProposal();

  const handleProposalSubmit = (data: ProposalFormData) => {
    proposalMutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        // You could show a success toast here
      },
    });
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
        >
          أرسل عرضك
        </button>
        <button
          onClick={onSendMessage}
          className="w-full flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-lg font-bold text-lg hover:bg-primary/5 transition-colors"
        >
          <MailIcon className="w-5 h-5" />
          إرسال رسالة
        </button>
      </div>

      <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleProposalSubmit}
        isSubmitting={proposalMutation.isPending}
        jobRequestId={jobRequestId}
      />
    </>
  );
}
