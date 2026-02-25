import { useState } from "react";
import MailIcon from "@/public/icons/MailIcon";
import ProposalModal from "@/components/ui/modals/ProposalModal";
import { useProposal } from "@/hooks/useProposal";
import {
  ProposalFormData,
  ProposalSubmitData,
} from "@/lib/validation/proposalSchema";
import { AxiosError } from "axios";

interface FreelancerActionsProps {
  onSendMessage: () => void;
  jobRequestId: string;
  onProposalSuccess: (proposalId: number) => void;
}

/**
 * FreelancerActions - Sidebar card for freelancers to submit proposals
 * and send messages.
 */
export default function FreelancerActions({
  onSendMessage,
  jobRequestId,
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
        onProposalSuccess(response.proposalId);
        setIsModalOpen(false);
      },
      onError: (error: AxiosError) => {
        console.error("Proposal submission error:", error);
        console.error("Error response:", error?.response);
        console.error("Error data:", error?.response?.data);
        console.error("Error status:", error?.response?.status);
      },
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl top-6">
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold text-base hover:bg-primary/90 transition-colors cursor-pointer"
          >
            أرسل عرضك
          </button>
        </div>
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
