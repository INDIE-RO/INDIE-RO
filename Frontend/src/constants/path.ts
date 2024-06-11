import { NavigationMenu } from '@/types/common';

export const PATH = {
  HOME: '/',
  POLICY_LIST: '/policies',
  POLICY_DETAIL: '/policies/:id',
  CUSTOM_INFO: '/custom-info',
  SURVEY: '/survey',
  INTRO: '/intro',
  EXCEPTION: '/*',
} as const;

export const API_PATH = {
  SURVEY_CATEGORY_META: '/policy/metadata/categories',
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
