"use client";

import { useState } from "react";
import CommonSearchAndFilters, {
  FilterField,
  FilterSelect,
} from "@/container/reusable/form/CommonSearchAndFilters";
import { RequestsToolbarProps } from "@/types/requestsToolbar";
import {
  ratingOptions,
  completedJobsOptions,
  nationalityOptions,
} from "@/data/requestsToolbarData";

const RequestsToolbar = ({
  searchParams,
  setSearchParams,
}: RequestsToolbarProps) => {
  const [filterShow, setFilterShow] = useState(false);

  // Update search params when local state changes
  const handleSearchChange = (value: string) => {
    setSearchParams((prev) => ({ ...prev, searchTerm: value, pageNumber: 1 }));
  };

  const handleRatingChange = (value: string) => {
    const minRating = value === "0" ? 0 : parseInt(value);
    setSearchParams((prev) => ({ ...prev, minRating, pageNumber: 1 }));
  };

  const handleNationalityChange = (value: string) => {
    const nationality = value === "all" ? "" : value;
    setSearchParams((prev) => ({ ...prev, nationality, pageNumber: 1 }));
  };

  return (
    <div className="w-full mb-8">
      <CommonSearchAndFilters
        searchTerm={searchParams.searchTerm}
        onSearchChange={handleSearchChange}
        filterShow={filterShow}
        onFilterToggle={setFilterShow}
        placeholder="ابحث عن مستقل محترف..."
      >
        {/* Rating Filter */}
        <FilterField label="التقييم">
          <FilterSelect
            options={ratingOptions}
            value={
              searchParams.minRating === 0
                ? "0"
                : searchParams.minRating.toString()
            }
            onChange={(e) => handleRatingChange(e.target.value)}
          />
        </FilterField>

        {/* Jobs Completed Filter */}
        <FilterField label="الوظائف المكتملة">
          <FilterSelect
            options={completedJobsOptions}
            value="0" // This would need to be implemented in API if needed
            onChange={() => {}} // Placeholder until API supports completed jobs filter
          />
        </FilterField>

        {/* Nationality Filter */}
        <FilterField label="الجنسية">
          <FilterSelect
            options={nationalityOptions}
            value={
              searchParams.nationality === "" ? "all" : searchParams.nationality
            }
            onChange={(e) => handleNationalityChange(e.target.value)}
          />
        </FilterField>
      </CommonSearchAndFilters>
    </div>
  );
};

export default RequestsToolbar;
