import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearArticles,
  fetchArticles,
  loadMoreArticles,
} from "../store/slices/articleSlice";
import {
  Category,
  CategoryEnum,
  UseArticlesResponse,
} from "../domain/types/types";

export const useArticles = (category: Category): UseArticlesResponse => {
  const dispatch = useAppDispatch();
  const {
    items,
    status,
    error,
    page,
    hasMore,
    searchQuery,
    activeFilters,
  } = useAppSelector((state) => state.articles);

  const isLoading = status === "loading";
  const isInitialLoading = isLoading && page === 1;

  const isCustomizeFeed = category === CategoryEnum.MY_FEED;

  // Initial load or refetch when category, searchQuery, or activeFilters change
  useEffect(() => {
    dispatch(clearArticles());
    dispatch(
      fetchArticles({
        category,
        searchQuery,
        filters: isCustomizeFeed ? activeFilters : undefined,
      })
    );
  }, [category, searchQuery, activeFilters, dispatch, isCustomizeFeed]);

  // Load more results
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(
        loadMoreArticles({
          category,
          page: page + 1,
          searchQuery,
          filters: isCustomizeFeed ? activeFilters : undefined,
        })
      );
    }
  }, [isLoading, hasMore, page, category, searchQuery, activeFilters, dispatch, isCustomizeFeed]);

  return {
    articles: items,
    loading: isLoading,
    categoryLoading: isInitialLoading,
    error,
    loadMore,
    hasMore,
  };
};
