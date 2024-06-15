import { useSuspenseQuery } from '@tanstack/react-query';

import { getCustomPolicies } from '@/components/Policy/CustomInfo/CustomInfo.api';

export const CUSTOM_POLICY_QUERY_KEY = {
  CUSTOM_POLICIES: 'CUSTOM_POLICIES',
} as const;

export const useCustomPoliciesQuery = (
  getCustomPoliciesProps: Parameters<typeof getCustomPolicies>[0],
) => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [CUSTOM_POLICY_QUERY_KEY.CUSTOM_POLICIES, location.search],
    queryFn: () => getCustomPolicies(getCustomPoliciesProps),
  });

  return {
    ...data,
    ...restQuery,
  };
};
