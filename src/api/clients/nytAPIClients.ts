import axios from 'axios';
import { NYTApiResponse, NYTApiParams } from '../../domain/interface/nytAPI';
import { Category, CategoryEnum } from "../../domain/types/types";

const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

if (!NYT_API_KEY) {
  throw new Error('Missing NYT API key. Please define REACT_APP_NYT_API_KEY in your environment variables.');
}

let lastRequestTime = Date.now() - 6100;

const nytApi = axios.create({
  baseURL: 'https://api.nytimes.com/svc/search/v2',
  params: {
    'api-key': NYT_API_KEY,
  },
});

const delayIfNeeded = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  if (timeSinceLastRequest < 6100) {
    await new Promise(resolve => setTimeout(resolve, 6100 - timeSinceLastRequest));
  }
};

const makeRequest = async (params: NYTApiParams): Promise<NYTApiResponse> => {
  const { data } = await nytApi.get<NYTApiResponse>('/articlesearch.json', {
    params: {
      ...params,
      'page-size': 12,
      sort: 'newest',
    },
  });
  lastRequestTime = Date.now();
  return data;
};

export const fetchNYTArticles = async (params: NYTApiParams): Promise<NYTApiResponse> => {
  try {
    await delayIfNeeded();
    return await makeRequest(params);
  } catch (error: any) {
    if (error.response?.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 6100));
      return await makeRequest(params);
    }
    throw error;
  }
};

export const getNYTCategory = (category: Category): string => {
  const categoryMap: Record<Category, string> = {
    [CategoryEnum.NEWS]: 'news',
    [CategoryEnum.BUSINESS]: 'business',
    [CategoryEnum.HEALTH]: 'health',
    [CategoryEnum.ENTERTAINMENT]: 'arts',
    [CategoryEnum.SCIENCE]: 'science',
    [CategoryEnum.TECHNOLOGY]: 'technology',
    [CategoryEnum.SPORTS]: 'sports',
    [CategoryEnum.MY_FEED]: 'my feed',
  };
  return categoryMap[category];
};
