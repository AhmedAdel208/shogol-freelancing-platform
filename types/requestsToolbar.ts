export interface RequestsToolbarProps {
  searchParams: {
    searchTerm: string;
    skillIds: number[];
    nationality: string;
    minRating: number;
    pageNumber: number;
    pageSize: number;
  };
  setSearchParams: React.Dispatch<React.SetStateAction<{
    searchTerm: string;
    skillIds: number[];
    nationality: string;
    minRating: number;
    pageNumber: number;
    pageSize: number;
  }>>;
}
