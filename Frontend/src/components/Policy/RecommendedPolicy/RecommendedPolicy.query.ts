import { useSuspenseQuery } from '@tanstack/react-query';

import { indieroLocalStorage } from '@/utils/localStorage';

import { getRecommendedPolicy } from './RecommendedPolicy.api';

export const RECOMMEND_POLICY_QUERY_KEY = {
  RECOMMENDED_POLICY: 'RECOMMENDED_POLICY',
} as const;

export const useRecommendedPolicyQuery = () => {
  const recentViewedPolicyId = indieroLocalStorage.getRecentViewedPolicyId() ?? undefined;
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [RECOMMEND_POLICY_QUERY_KEY.RECOMMENDED_POLICY, recentViewedPolicyId],
    queryFn: () => getRecommendedPolicy({ id: recentViewedPolicyId }),
  });

  return {
    recommendedPolicy: data.recommendedPolicies,
    ...restQuery,
  };
};
