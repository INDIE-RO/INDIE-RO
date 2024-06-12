import { useSuspenseQuery } from '@tanstack/react-query';

import { getPolicies } from '@/components/Policy/PolicyList/PolicyList.api';

export const POLICY_QUERY_KEY = {
  POLICIES: 'POLICIES',
} as const;

export const usePoliciesQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [POLICY_QUERY_KEY.POLICIES],
    queryFn: getPolicies,
  });

  return {
    ...data,
    ...restQuery,
  };
};
