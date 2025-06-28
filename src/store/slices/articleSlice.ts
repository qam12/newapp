import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  ArticleResponse,
  ArticleState,
  Category,
  CategoryEnum
} from "../../domain/types/types";
import { newsArticleService } from "../../api/services/newsArticleService";

const initialState: ArticleState = {
  items: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: "",
  category: CategoryEnum.NEWS,
  activeFilters: {
    sources: [],
    categories: [],
    authors: []
  },
};

export const fetchArticles = 
createAsyncThunk<ArticleResponse, { category: Category; searchQuery?: string; filters?: ArticleState["activeFilters"]; }>(
  "articles/fetchArticles",
  async (params) => {
    return await newsArticleService.fetchArticles(params);
  }
);

export const loadMoreArticles = createAsyncThunk<ArticleResponse, { category: Category; page: number; searchQuery?: string; filters?: ArticleState["activeFilters"]; }>(
  "articles/loadMore",
  async (params) => {
    return await newsArticleService.fetchArticles({ ...params });
  }
);

export const searchArticles = createAsyncThunk(
  "articles/search",
  async (query: string, { dispatch, getState }) => {
    const state = getState() as { articles: ArticleState };
    dispatch(articleSlice.actions.updateSearchQuery(query));
    return await dispatch(
      fetchArticles({
        category: state.articles.category,
        searchQuery: query,
        filters: state.articles.activeFilters,
      })
    );
  }
);

export const setFilters = createAsyncThunk(
  "articles/setFilters",
  async (filters: ArticleState["activeFilters"], { dispatch }) => {
    dispatch(articleSlice.actions.updateActiveFilters(filters));
    return filters;
  }
);

// DRY handlers
const handleLoadingState = (state: ArticleState) => {
  state.status = "loading";
  state.error = null;
};

const handleErrorState = (state: ArticleState, action: any) => {
  state.status = "failed";
  state.error = action.error?.message || "Something went wrong.";
};

const handleArticlesSuccess = (
  state: ArticleState,
  action: PayloadAction<ArticleResponse>,
  isLoadMore = false
) => {
  state.status = "succeeded";
  state.items = isLoadMore
    ? [...state.items, ...action.payload.articles]
    : action.payload.articles;
  state.hasMore = action.payload.hasMore;
  if (isLoadMore) state.page += 1;
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.items = [];
    },
    updateActiveFilters: (
      state,
      action: PayloadAction<ArticleState["activeFilters"]>
    ) => {
      state.activeFilters = action.payload;
      state.page = 1;
      state.items = [];
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
      state.page = 1;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, handleLoadingState)
      .addCase(fetchArticles.fulfilled, (state, action) =>
        handleArticlesSuccess(state, action, false)
      )
      .addCase(fetchArticles.rejected, handleErrorState)

      .addCase(loadMoreArticles.pending, handleLoadingState)
      .addCase(loadMoreArticles.fulfilled, (state, action) =>
        handleArticlesSuccess(state, action, true)
      )
      .addCase(loadMoreArticles.rejected, handleErrorState);
  },
});

export const {
  clearArticles,
  updateSearchQuery,
  updateActiveFilters,
  updateCategory
} = articleSlice.actions;

export default articleSlice.reducer;
