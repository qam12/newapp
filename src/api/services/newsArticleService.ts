import {
  fetchNewsArticles,
} from "../clients/newsAPIClient";
import {
  fetchGuardianArticles,
  getGuardianCategory,
} from "../clients/guardianAPIClient";
import {
  fetchNYTArticles,
  getNYTCategory,
} from "../clients/nytAPIClients";
import {
  Article,
  ArticleResponse,
  ArticleServiceParams,
  Category,
  CategoryEnum,
} from "../../domain/types/types";
import { NewsApiArticle } from "../../domain/interface/newsAPI";
import { GuardianArticle } from "../../domain/interface/guardianAPI";
import { NYTArticle } from "../../domain/interface/nytAPI";

const ITEMS_PER_SOURCE = 5;

const SOURCE_FORMATTERS = {
  newsapi: (a: NewsApiArticle): Article => ({
    id: `news-${a.source.name}-${a.publishedAt}-${Math.random()}`,
    source: a.source.name,
    title: a.title,
    author: a.author ?? "Anonymous",
    publishTime: new Date(a.publishedAt).toLocaleDateString(),
    imageUrl: a.urlToImage || "",
  }),
  guardian: (a: GuardianArticle): Article => ({
    id: `guardian-${a.id}-${Math.random()}`,
    source: "The Guardian",
    title: a.webTitle,
    author: a.pillarName ?? "Anonymous",
    publishTime: new Date(a.webPublicationDate).toLocaleDateString(),
    imageUrl: a.fields?.thumbnail || "",
  }),
  nyt: (a: NYTArticle): Article => {
    const imgUrl = a.multimedia?.[0]?.url
      ? `https://www.nytimes.com/${a.multimedia[0]?.url}`
      : ""; 
    return {
      id: `nyt-${a.web_url}-${Math.random()}`,
      source: "New York Times",
      title: a.headline.main,
      author: a.byline?.original ?? "Unknown",
      publishTime: new Date(a.pub_date).toLocaleDateString(),
      imageUrl: imgUrl,
    };
  },
};

const createSearchFilter = (searchQuery?: string) => {
  const q = searchQuery?.toLowerCase();
  return {
    newsapi: (a: NewsApiArticle) =>
      !q || a.title?.toLowerCase().includes(q) || a.description?.toLowerCase().includes(q),
    guardian: (a: GuardianArticle) => !q || a.webTitle?.toLowerCase().includes(q),
    nyt: (a: NYTArticle) =>
      !q ||
      a.headline.main?.toLowerCase().includes(q) ||
      a.abstract?.toLowerCase().includes(q),
  };
};

const fetchSourceArticles = async (
  source: string,
  category: Category,
  page: number,
  searchQuery?: string
) => {
  try {
    if (source === "newsapi") {
      return await fetchNewsArticles({
        category: category.toLowerCase(),
        page,
        pageSize: ITEMS_PER_SOURCE,
        q: searchQuery,
      });
    }
    if (source === "guardian") {
      return await fetchGuardianArticles({
        section: getGuardianCategory(category),
        page,
        "page-size": ITEMS_PER_SOURCE,
        q: searchQuery,
      });
    }
    if (source === "nyt") {
      return await fetchNYTArticles({
        fq: searchQuery || `news_desk:("${getNYTCategory(category)}")`,
        page: page - 1,
      });
    }
  } catch (error) {
    console.error(`${source.toUpperCase()} fetch error:`, error);
    return null;
  }
};

const getArticlesFromResponse = (
  source: "newsapi" | "guardian" | "nyt",
  response: any
): any[] => {
  if (!response) return [];

  if (source === "newsapi") {
    return Array.isArray(response.articles) ? response.articles : [];
  }
  if (source === "guardian") {
    return Array.isArray(response?.response?.results) ? response.response.results : [];
  }
  if (source === "nyt") {
    return Array.isArray(response?.response?.docs) ? response.response.docs : [];
  }

  return [];
};

export const newsArticleService = {
  async fetchArticles({
    category,
    page = 1,
    searchQuery,
    filters,
  }: ArticleServiceParams): Promise<ArticleResponse> {
    const searchFilter = createSearchFilter(searchQuery);
    const selectedSources = filters?.sources?.length
      ? filters.sources
      : ["newsapi", "guardian", "nyt"];
    const selectedCategory =
      category === CategoryEnum.MY_FEED && filters?.categories?.length
        ? (filters.categories[0] as CategoryEnum)
        : category;

    const results = await Promise.allSettled(
      selectedSources.map((source) =>
        fetchSourceArticles(source, selectedCategory, page, searchQuery)
      )
    );

    // console available sources
    // results.forEach((response, idx) => {
    //   const source = selectedSources[idx];
    //   console.log(`[${source.toUpperCase()} Response]`, response);
    // });

    const combinedArticles = results.flatMap((response, idx) => {
      if (response.status !== "fulfilled" || !response.value) return [];
      const source = selectedSources[idx];
      const mapper = SOURCE_FORMATTERS[source as keyof typeof SOURCE_FORMATTERS];
      const filter = searchFilter[source as keyof ReturnType<typeof createSearchFilter>];
      const rawArticles = getArticlesFromResponse(source as any, response.value);
      return rawArticles.filter(filter).map(mapper);
    });


    const uniqueArticles = combinedArticles
      .sort((a, b) => new Date(b.publishTime).getTime() - new Date(a.publishTime).getTime())
      .filter((a, idx, self) => idx === self.findIndex((other) => other.title === a.title));

    return {
      articles: uniqueArticles,
      hasMore: page < 5 && uniqueArticles.length >= ITEMS_PER_SOURCE,
    };
  },
};
