import { useState, useCallback } from "react";
import { FilterConfig } from "../domain/types/types";

type FilterValues = string[];
type FilterState = Record<string, FilterValues>;

const initFilters = (sections: FilterConfig[]): FilterState =>
  sections.reduce((acc, { key }) => ({ ...acc, [key]: [] }), {});

export const useFeedFilter = (sections: FilterConfig[]) => {
  const [filters, setFilters] = useState<FilterState>(() => initFilters(sections));

  const updateFilter = useCallback((key: string, values: FilterValues) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initFilters(sections));
  }, [sections]);

  const getFilter = useCallback(
    (key: string): FilterValues => filters[key] || [],
    [filters]
  );

  const getFilterCount = useCallback(() => {
    return Object.values(filters).flat().length;
  }, [filters]);

  return {
    filters,
    updateFilter,
    clearFilters,
    getFilter,
    getFilterCount
  };
};
