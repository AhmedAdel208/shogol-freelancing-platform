import { Project } from "./announcements";

export interface UseProjectDetailProps {
  id: string;
  enabled?: boolean;
}

export interface ProjectDetailQueryResult {
  project: Project | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
