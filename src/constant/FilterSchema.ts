import { DropDownOptions, FilterConfig } from "../domain/types/types";

export const sources: DropDownOptions[] = [
 { value: "guardian", label: "The Guardian" },
  { value: "nyt", label: "New York Times" },
  { value: "newsapi", label: "NewsAPI" },
];

export const categories: DropDownOptions[] = [
  { value: "general", label: "General" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health" },
  { value: "entertainment", label: "Entertainment" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
];

export const authors: DropDownOptions[] = [
  { value: "emilyWeinstein", label: "Emily Weinstein" },
  { value: "manohlaDargis", label: "Manohla Dargis" },
];

export const filterSections: FilterConfig[] = [
  { key: "sources", title: "Sources", options: sources },
  { key: "categories", title: "Categories", options: categories },
  { key: "authors", title: "Authors", options: authors },
];
