import axios from 'axios';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

if (!NEWS_API_KEY) {
  throw new Error('Missing News API key. Please define REACT_APP_NEWS_API_KEY in your environment variables.');
}

const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    'X-Api-Key': NEWS_API_KEY,
  },
});

export const fetchNewsArticles = async (params: any) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        ...params,
        language: 'en',
        sortBy: 'publishedAt',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      return {
        articles: [],
        totalResults: 0,
      };
    }
    throw error;
  }
};
