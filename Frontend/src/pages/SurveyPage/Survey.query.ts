import { useSuspenseQuery } from '@tanstack/react-query';

import { getSurveyCategoryMeta } from './Survey.api';

export const SURVEY_QUERY_KEY = {
  CATEGORY_META: 'categories',
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
