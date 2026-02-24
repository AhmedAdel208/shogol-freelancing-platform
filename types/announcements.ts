// Search and Filters Component Types
export interface SearchAndFiltersProps {
  searchTerm: string;
  minBudget: string;
  maxBudget: string;
  status: string;
  filterShow: boolean;
  onSearchChange: (value: string) => void;
  onFilterChange: (
    key: keyof FiltersState,
    value: string | number | boolean,
  ) => void;
}

// Project Card Types
export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: string;
  durationInDays: number;
  proposalsCount: number;
  clientName: string;
  clientAvatar?: string;
  createdAt: string;
  skills?: Array<{ id: string; nameAr: string }>;
}

export interface ProjectCardProps {
  project: Project;
}

// Loading State Types
export interface LoadingStateProps {
  message?: string;
}

// Empty State Types
export interface EmptyStateProps {
  message?: string;
  title?: string;
}

// Results Counter Types
export interface ResultsCounterProps {
  currentCount: number;
  totalCount: number;
  label?: string;
}

// Filter Hook Types
export interface FiltersState {
  searchTerm: string;
  minBudget: string;
  maxBudget: string;
  status: string;
  pageNumber: number;
  filterShow: boolean;
}

export interface UseAnnouncementsFiltersReturn {
  filters: FiltersState;
  apiParams: {
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
    minBudget?: number;
    maxBudget?: number;
    status?: string;
  };
  updateFilter: (
    key: keyof FiltersState,
    value: string | number | boolean,
  ) => void;
  resetFilters: () => void;
}
