import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getSurveyAgeMeta, getSurveyCategoryMeta, getSurveyRegionMeta } from './Survey.api';

export const SURVEY_QUERY_KEY = {
  CATEGORY_META: 'CATEGORY_META',
  REGION_META: 'REGION_META',
  AGE_META: 'AGE_META',
} as const;

export const useSurveyCategoryMetaQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [SURVEY_QUERY_KEY.CATEGORY_META],
    queryFn: getSurveyCategoryMeta,
  });

  return {
    categoryMeta: data,
    ...restQuery,
  };
};

export const useSurveyRegionMetaQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [SURVEY_QUERY_KEY.REGION_META],
    queryFn: getSurveyRegionMeta,
  });

  return {
    regionMeta: data,
    ...restQuery,
  };
};

export const useSurveyAgeMetaQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [SURVEY_QUERY_KEY.AGE_META],
    queryFn: getSurveyAgeMeta,
  });

  return {
    ageMeta: data,
    ...restQuery,
  };
};
