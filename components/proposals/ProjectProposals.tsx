"use client";

import ProposalsList from "./ProposalsList";
import { useProjectDetail } from "@/hooks/useProjectDetail";
import { getCurrentUser } from "@/utils/auth";
import Loading from "@/common/Loading";

interface ProjectProposalsProps {
  proposalId?: number | null;
  jobRequestId?: string;
}
export default function ProjectProposals({
  jobRequestId,
}: ProjectProposalsProps) {
  const {
    data: project,
    isLoading,
    error,
  } = useProjectDetail({
    id: jobRequestId || "",
  });

  const currentUser = getCurrentUser();
  const isProjectOwner = currentUser?.id === project?.clientId;

  if (isLoading) {
    return  <Loading />
      

  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">حدث خطأ أثناء تحميل العروض</p>
      </div>
    );
  }

  // Proposals are included in the job details response
  const projectProposals = project?.proposals || [];

  if (!projectProposals || projectProposals.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-border p-6 text-center">
        <p className="text-gray-medium">
          لا توجد عروض مقدمة لهذا المشروع حتى الآن
        </p>
      </div>
    );
  }

  return (
    <ProposalsList
      proposals={projectProposals}
      isProjectOwner={isProjectOwner}
    />
  );
}
