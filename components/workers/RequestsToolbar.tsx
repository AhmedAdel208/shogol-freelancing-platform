"use client";

import { useState } from "react";
import CommonSearchAndFilters, { FilterField, FilterSelect } from "@/container/reusable/form/CommonSearchAndFilters";

const ratingOptions = [
  { value: "0", label: "الكل" },
  { value: "5", label: "5 نجوم" },
  { value: "4", label: "4 نجوم وما فوق" },
  { value: "3", label: "3 نجوم وما فوق" },
];

const completedJobsOptions = [
  { value: "0", label: "أي عدد" },
  { value: "5", label: "أكثر من 5 وظائف" },
  { value: "10", label: "أكثر من 10 وظائف" },
  { value: "20", label: "أكثر من 20 وظيفة" },
];

const nationalityOptions = [
  { value: "all", label: "كل الجنسيات" },
  { value: "egypt", label: "مصر" },
  { value: "saudi", label: "السعودية" },
  { value: "uae", label: "الإمارات" },
];

export default function RequestsToolbar() {
  const [search, setSearch] = useState("");
  const [filterShow, setFilterShow] = useState(false);
  const [rating, setRating] = useState("0");
  const [jobs, setJobs] = useState("0");
  const [nationality, setNationality] = useState("all");

  return (
    <div className="w-full mb-8">
      <CommonSearchAndFilters
        searchTerm={search}
        onSearchChange={setSearch}
        filterShow={filterShow}
        onFilterToggle={setFilterShow}
        placeholder="ابحث عن مستقل محترف..."
      >
        {/* Rating Filter */}
        <FilterField label="التقييم">
          <FilterSelect 
            options={ratingOptions}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </FilterField>

        {/* Jobs Completed Filter */}
        <FilterField label="الوظائف المكتملة">
          <FilterSelect 
            options={completedJobsOptions}
            value={jobs}
            onChange={(e) => setJobs(e.target.value)}
          />
        </FilterField>

        {/* Nationality Filter */}
        <FilterField label="الجنسية">
          <FilterSelect 
            options={nationalityOptions}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </FilterField>
      </CommonSearchAndFilters>
    </div>
  );
}