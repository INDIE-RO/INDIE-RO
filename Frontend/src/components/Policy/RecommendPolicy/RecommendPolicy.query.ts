import { useSuspenseQuery } from '@tanstack/react-query';

import { getRecommendPolicy } from './RecommendPolicy.api';

export const RECOMMEND_POLICY_QUERY_KEY = {
  RECOMMEND_POLICY: 'RECOMMEND_POLICY',
} as const;

export const useRecommendPolicyQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [RECOMMEND_POLICY_QUERY_KEY.RECOMMEND_POLICY],
    queryFn: getRecommendPolicy,
  });

  return {
    recommendPolicy: data.recommendedPolicies,
    ...restQuery,
  };
};
