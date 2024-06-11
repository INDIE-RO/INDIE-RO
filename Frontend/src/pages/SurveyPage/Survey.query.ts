import { useSuspenseQuery } from '@tanstack/react-query';

import { getSurveyCategoryMeta, getSurveyRegionMeta } from './Survey.api';

export const SURVEY_QUERY_KEY = {
  CATEGORY_META: 'CATEGORY_META',
  REGION_META: 'REGION_META',
} as const;

export const useSurveyCategoryMetaQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [SURVEY_QUERY_KEY.CATEGORY_META],
    queryFn: getSurveyCategoryMeta,
  });

  return {
    categoryMeta: data,
    ...restQuery,
  };
};

export const useSurveyRegionMetaQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [SURVEY_QUERY_KEY.REGION_META],
    queryFn: getSurveyRegionMeta,
  });

  return {
    regionMeta: data,
    ...restQuery,
  };
};
