import axios from 'axios';
import { Category, CategoryEnum } from '../../domain/types/types';
import { GuardianApiResponse, GuardianApiParams } from '../../domain/interface/guardianAPI';

const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

if (!GUARDIAN_API_KEY) {
  throw new Error('Missing Guardian API key. Please define REACT_APP_GUARDIAN_API_KEY in your environment variables.');
}

const guardianApi = axios.create({
  baseURL: 'https://content.guardianapis.com',
  params: {
    'api-key': GUARDIAN_API_KEY,
    'page-size': 10,
    'show-fields': 'headline,thumbnail,bodyText',
    'order-by': 'newest'
  }
});

export const fetchGuardianArticles = async (
  params: GuardianApiParams
): Promise<GuardianApiResponse> => {
  const { data } = await guardianApi.get<GuardianApiResponse>('/search', {
    params
  });
  return data;
};

const categoryMap: Record<Category, string> = {
  [CategoryEnum.NEWS]: 'news',
  [CategoryEnum.BUSINESS]: 'business',
  [CategoryEnum.HEALTH]: 'health',
  [CategoryEnum.ENTERTAINMENT]: 'culture',
  [CategoryEnum.SCIENCE]: 'science',
  [CategoryEnum.TECHNOLOGY]: 'technology',
  [CategoryEnum.SPORTS]: 'sport',
  [CategoryEnum.MY_FEED]: 'my feed'
};

export const getGuardianCategory = (category: Category): string =>
  categoryMap[category];
