"use client";

import ProposalsList from "./ProposalsList";
import { useMyProposals } from "@/hooks/useMyProposals";

interface ProjectProposalsProps {
  proposalId?: number | null;
  jobRequestId?: string;
}

/**
 * ProjectProposals - Fetches and displays the user's proposals.
 */
export default function ProjectProposals({
  jobRequestId,
}: ProjectProposalsProps) {
  const { data: myProposals, isLoading, error } = useMyProposals();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">حدث خطأ أثناء تحميل العروض</p>
      </div>
    );
  }

  // Filter proposals for this specific job request
  const projectProposals =
    myProposals?.proposals.filter(
      (proposal) => proposal.jobRequestId === Number(jobRequestId),
    ) || [];

  if (!projectProposals || projectProposals.length === 0) {
    return null;
  }

  return <ProposalsList proposals={projectProposals} />;
}
