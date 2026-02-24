import { Project } from "./announcements";

// Project Header Component Props
export interface ProjectHeaderProps {
  project: Project;
}

// Client Info Component Props
export interface ClientInfoProps {
  project: Project;
}

// Project Details Component Props
export interface ProjectDetailsProps {
  project: Project;
}

// Project Skills Component Props
export interface ProjectSkillsProps {
  project: Project;
}

// Project Actions Component Props
export interface ProjectActionsProps {
  projectOwnerId: string;
  jobRequestId: string;
  onProposalSubmit: () => void;
  onSendMessage: () => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
}

// Loading State Component Props
export interface DetailLoadingStateProps {
  message?: string;
}

// Error State Component Props
export interface ErrorStateProps {
  title?: string;
  message?: string;
  backButtonText?: string;
  backButtonHref?: string;
}
