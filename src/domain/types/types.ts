export interface ArticleState {
  items: Article[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
  category: CategoryEnum;
  activeFilters: {
    sources: string[];
    categories: string[];
    authors: string[];
  };
}

export type ArticleResponse = {
  articles: Article[];
  hasMore: boolean;
};

export type Article = {
  id: string;
  title: string;
  source: string;
  author: string;
  publishTime: string;
  imageUrl: string;
};

export type DropDownOptions = {
  value: string;
  label: string;
};

export enum CategoryEnum {
  NEWS = "general",
  BUSINESS = "business",
  HEALTH = "health",
  ENTERTAINMENT = "entertainment",
  SCIENCE = "science",
  TECHNOLOGY = "technology",
  SPORTS = "sports",
  MY_FEED = "my feed",
}

export type Category = CategoryEnum;

export type UseArticlesResponse = {
  articles: Article[];
  loading: boolean;
  categoryLoading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
};

export interface ArticleServiceParams {
  category: Category;
  page?: number;
  searchQuery?: string;
  filters?: {
    sources: string[];
    categories: string[];
  };
}

export type FilterState = {
  sources: string[];
  categories: string[];
  authors: string[];
  searchQuery: string;
};

export type FilterConfig = {
  key: string;
  title: string;
  options: FilterOption[];
};

export type FilterOption = {
  value: string;
  label: string;
};

export type FiltersData = {
  sources?: string[];
  categories?: string[];
  authors?: string[];
};

export interface NewsArticleCardSkeletonProps {
  count?: number;
}

export interface FilterButtonProps {
  activeFilterCount: number;
  onClick: () => void;
}

export interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onApplyFilter: (count: number) => void;
}

export interface FilterSelectProps {
  title: string;
  options: DropDownOptions[];
  value: string[];
  onChange: (values: string[]) => void;
}

export interface ArticleCardProps {
  title: string;
  imageUrl: string;
  source?: string;
  author?: string;
  publishTime?: string;
}

export interface NewsCardListingProps {
  category: CategoryEnum;
}

export interface NavigationMenuProps {
  onChangeMenu: (category: CategoryEnum) => void;
}
