"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useJobRequests } from "@/hooks/useJobRequests";
import { useAnnouncementsFilters } from "@/hooks/useAnnouncementsFilters";
import { transformJobRequestToProject } from "@/utils/dataTransforms";
import SearchAndFilters from "./SearchAndFilters";
import ProjectCard from "./ProjectCard";
import EmptyState from "@/common/EmptyState";
import ErrorState from "@/common/ErrorState";
import ResultsCounter from "./ResultsCounter";
import Loading from "@/common/Loading";

export default function AdsSection() {
  const searchParams = useSearchParams();
  const { apiParams, filters, updateFilter } = useAnnouncementsFilters();
  const { data, isLoading, error, refetch } = useJobRequests(apiParams);

  // Read search query from URL on mount
  useEffect(() => {
    const searchFromUrl = searchParams.get("search");
    if (searchFromUrl) {
      updateFilter("searchTerm", searchFromUrl);
    }
  }, [searchParams]);

  const projects =
    data?.jobRequests?.filter((project) => project.status === "Pending") || [];

  if (isLoading) return <Loading />;

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] py-8 px-4  sm:px-6 lg:px-8 font-sans"
      dir="rtl"
    >
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black font-cairo text-dark tracking-tight mb-2">
              تصفح الإعلانات
            </h1>
          </div>

          <p className="text-lg font-bold font-cairo text-slate-400 max-w-2xl mx-auto leading-relaxed">
            اعثر على المشروع المثالي لمهاراتك
          </p>
        </div>

        {/* Search & Filter Bar */}
        <SearchAndFilters
          searchTerm={filters.searchTerm}
          minBudget={filters.minBudget}
          maxBudget={filters.maxBudget}
          status={filters.status}
          filterShow={filters.filterShow}
          onSearchChange={(value) => updateFilter("searchTerm", value)}
          onFilterChange={updateFilter}
        />

        {/* Results Counter */}
        <ResultsCounter currentCount={projects.length} />

        {error && (
          <ErrorState message="حدث خطأ أثناء جلب الإعلانات. يرجى المحاولة لاحقاً." onRetry={refetch} />
        )}

        {!isLoading && !error && projects.length === 0 && <EmptyState />}

        {/* Project Cards List */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 ">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={transformJobRequestToProject(project)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
