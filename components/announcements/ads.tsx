"use client";
import { useJobRequests } from "@/hooks/useJobRequests";
import { useAnnouncementsFilters } from "@/hooks/useAnnouncementsFilters";
import { transformJobRequestToProject } from "@/utils/dataTransforms";
import SearchAndFilters from "./SearchAndFilters";
import ProjectCard from "./ProjectCard";
import EmptyState from "./EmptyState";
import ResultsCounter from "./ResultsCounter";
import Loading from "@/common/Loading";

export default function AdsSection() {
  const { apiParams, filters, updateFilter } = useAnnouncementsFilters();
  const { data, isLoading, error } = useJobRequests(apiParams);

  const projects =
    data?.jobRequests?.filter((project) => project.status === "Pending") || [];

  if (isLoading) return <Loading />;

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] py-12 px-4  sm:px-6 lg:px-8 font-sans"
      dir="rtl"
    >
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl font-extrabold text-dark tracking-tight">
              تصفح الإعلانات
            </h1>
          </div>
          <p className="text-slate-500 font-el-missiri">
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
          <div className="text-center py-12 text-red-500">
            حدث خطأ أثناء جلب الإعلانات. يرجى المحاولة لاحقاً.
          </div>
        )}

        {!isLoading && !error && projects.length === 0 && <EmptyState />}

        {/* Project Cards List */}
        {!isLoading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6 ">
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
