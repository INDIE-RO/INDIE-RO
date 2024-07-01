import { useSuspenseQuery } from '@tanstack/react-query';

import { indieroLocalStorage } from '@/utils/localStorage';

import { getRecommendedPolicy } from './RecommendedPolicy.api';

export const RECOMMEND_POLICY_QUERY_KEY = {
  RECOMMENDED_POLICY: 'RECOMMENDED_POLICY',
} as const;

export const useRecommendedPolicyQuery = () => {
  const recentViewedPolicyId = indieroLocalStorage.getRecentViewedPolicyId() ?? 0;
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [RECOMMEND_POLICY_QUERY_KEY.RECOMMENDED_POLICY, recentViewedPolicyId],
    queryFn: getRecommendedPolicy,
    staleTime: 0,
    gcTime: 0,
  });

  return {
    recommendedPolicy: data.recommendedPolicies,
    ...restQuery,
  };
};
