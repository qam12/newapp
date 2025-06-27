import { CategoryEnum, FiltersData } from "../domain/types/types";

export const hasActiveFilters = (filters: FiltersData): boolean => {
  return (
    (filters.sources?.length ?? 0) > 0 ||
    (filters.categories?.length ?? 0) > 0 ||
    (filters.authors?.length ?? 0) > 0
  );
};

export const getActiveFilterCount = (filters: Record<string, string[]>) => {
  return Object.values(filters).reduce((count, arr) => count + arr.length, 0);
};

export const transformMenuText = (category: CategoryEnum): string => {
  return category
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};


