"use client";

import { useAuth } from "@/hooks/auth/useAuth";
import { ProjectActionsProps } from "@/types/detailComponents";
import { getCurrentUser } from "@/utils/auth";
import NotLoggedInActions from "./projectActions/NotLoggedInActions";
import OwnerActions from "./projectActions/OwnerActions";
import FreelancerActions from "./projectActions/FreelancerActions";
import ClientActions from "./projectActions/ClientActions";

export default function ProjectActions({
  projectOwnerId,
  onProposalSubmit,
  onSendMessage,
  onEditProject,
  onDeleteProject,
}: ProjectActionsProps) {
  const { isAuthenticated, isMounted } = useAuth();

  // Avoid hydration mismatch
  if (!isMounted) return null;

  // ❌ Not logged in
  if (!isAuthenticated) {
    return <NotLoggedInActions />;
  }

  const currentUser = getCurrentUser();
  const isOwner = currentUser?.id === projectOwnerId;
  const isFreelancer = currentUser?.isFreelancer;

  // ✅ Owner (عميل who owns this project)
  if (isOwner) {
    return (
      <OwnerActions
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />
    );
  }

  // ✅ Freelancer (مستقل)
  if (isFreelancer) {
    return <FreelancerActions onSendMessage={onSendMessage} />;
  }

  // ✅ Client (عميل) who does NOT own the project
  return <ClientActions onSendMessage={onSendMessage} />;
}
