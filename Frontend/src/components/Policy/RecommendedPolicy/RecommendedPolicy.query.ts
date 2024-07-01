import { useSuspenseQuery } from '@tanstack/react-query';

import { getRecommendedPolicy } from './RecommendedPolicy.api';

export const RECOMMEND_POLICY_QUERY_KEY = {
  RECOMMENDED_POLICY: 'RECOMMENDED_POLICY',
} as const;

export const useRecommendedPolicyQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [RECOMMEND_POLICY_QUERY_KEY.RECOMMENDED_POLICY],
    queryFn: getRecommendedPolicy,
  });

  return {
    recommendedPolicy: data.recommendedPolicies,
    ...restQuery,
  };
};
