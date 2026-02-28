"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { ProjectActionsProps } from "@/types/detailComponents";
import NotLoggedInActions from "./projectActions/NotLoggedInActions";
import OwnerActions from "./projectActions/OwnerActions";
import FreelancerActions from "./projectActions/FreelancerActions";


export default function ProjectActions({
  projectOwnerId,
  jobRequestId,
  projectStatus,
  onSendMessage,
  onEditProject,
  onDeleteProject,
  onProposalSuccess,
  hasSubmittedProposal,
}: ProjectActionsProps) {
  const { isAuthenticated, isMounted, user } = useAuth();

  if (!isMounted) return null;

  if (!isAuthenticated) {
    return <NotLoggedInActions />;
  }

  const isOwner = user?.id === projectOwnerId;
  const isFreelancer = user?.isFreelancer;

  if (isOwner) {
    return (
      <OwnerActions
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
        projectStatus={projectStatus}
      />
    );
  }

  if (isFreelancer) {
    return (
      <FreelancerActions
        onSendMessage={onSendMessage}
        jobRequestId={jobRequestId}
        onProposalSuccess={onProposalSuccess}
        hasSubmittedProposal={hasSubmittedProposal}
      />
    );
  }
}
