"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { ProjectActionsProps } from "@/types/detailComponents";
import { getCurrentUser } from "@/utils/auth";
import NotLoggedInActions from "./projectActions/NotLoggedInActions";
import OwnerActions from "./projectActions/OwnerActions";
import FreelancerActions from "./projectActions/FreelancerActions";
// import ClientActions from "./projectActions/ClientActions";

export default function ProjectActions({
  projectOwnerId,
  jobRequestId,
  onSendMessage,
  onEditProject,
  onDeleteProject,
  onProposalSuccess, // ✅ was missing here
}: ProjectActionsProps) {
  const { isAuthenticated, isMounted } = useAuth();

  if (!isMounted) return null;

  if (!isAuthenticated) {
    return <NotLoggedInActions />;
  }

  const currentUser = getCurrentUser();
  const isOwner = currentUser?.id === projectOwnerId;
  const isFreelancer = currentUser?.isFreelancer;

  if (isOwner) {
    return (
      <OwnerActions
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />
    );
  }

  if (isFreelancer) {
    return (
      <FreelancerActions
        onSendMessage={onSendMessage}
        jobRequestId={jobRequestId}
        onProposalSuccess={onProposalSuccess}
      />
    );
  }
}
