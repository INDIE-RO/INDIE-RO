import { NavigationMenu } from '@/types/common';

export const PATH = {
  INTRO: '/',
  HOME: '/home',
  POLICY_LIST: '/policies',
  POLICY_DETAIL: '/policies/:id',
  POLICY_SEARCH: '/policies/search',
  CUSTOM_INFO: '/custom-info',
  SURVEY: '/survey',
  EXCEPTION: '/*',
} as const;

export const API_PATH = {
  POLICY_LIST: '/policies',
  POLICY_DETAIL: '/policies/:id',
  POLICY_SEARCH: '/policies/search',
  CUSTOM_INFO: '/policies/user',
  WORD_CLOUD: '/policies/wordCloud',
  FILTER_META: '/policy/metadata/filters',
  SORT_META: '/policy/metadata/sortFields',
  SURVEY_CATEGORY_META: '/policy/metadata/categories',
  SURVEY_REGION_META: '/policy/metadata/regions',
  SURVEY_AGE_META: '/policy/metadata/ages',
} as const;

export const NAVIGATION_MENU: NavigationMenu[] = [
  {
    variant: 'home',
    name: '홈',
    path: PATH.HOME,
  },
  {
    variant: 'allInfo',
    name: '모든정보',
    path: PATH.POLICY_LIST,
  },
  {
    variant: 'user',
    name: '맞춤정보',
    path: PATH.CUSTOM_INFO,
  },
  {
    variant: 'modify',
    name: '설문수정',
    path: PATH.SURVEY,
  },
];
