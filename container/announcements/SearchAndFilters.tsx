"use client";

import { SearchAndFiltersProps } from "@/types/announcements";
import { statusOptions } from "@/data/statusOptions";
import CommonSearchAndFilters, { FilterField, FilterInput, FilterSelect, FilterOption } from "@/container/reusable/form/CommonSearchAndFilters";

export default function SearchAndFilters({
  searchTerm,
  minBudget,
  maxBudget,
  status,
  filterShow,
  onSearchChange,
  onFilterChange,
}: SearchAndFiltersProps) {
  return (
    <CommonSearchAndFilters
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      filterShow={filterShow}
      onFilterToggle={(show) => onFilterChange("filterShow", show)}
      placeholder="ابحث عن مشاريع ملهمة..."
    >
      {/* Min Budget */}
      <FilterField label="الحد الأدنى للميزانية">
        <FilterInput
          type="text"
          inputMode="numeric"
          placeholder="0"
          unit="ريال"
          value={minBudget}
          onChange={(e) => onFilterChange("minBudget", e.target.value)}
        />
      </FilterField>

      {/* Max Budget */}
      <FilterField label="الحد الأقصى للميزانية">
        <FilterInput
          type="text"
          inputMode="numeric"
          placeholder="10,000"
          unit="ريال"
          value={maxBudget}
          onChange={(e) => onFilterChange("maxBudget", e.target.value)}
        />
      </FilterField>

      {/* Status */}
      <FilterField label="حالة المشروع">
        <FilterSelect
          options={statusOptions}
          value={status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        />
      </FilterField>
    </CommonSearchAndFilters>
  );
}
