import { useSuspenseQuery } from '@tanstack/react-query';

import { getSearchPolicies } from './PolicySearch.api';

export const SEARCH_POLICY_QUERY_KEY = {
  SEARCH_POLICIES: 'SEARCH_POLICIES',
} as const;

export const useSearchPoliciesQuery = (
  getSearchPoliciesProps: Parameters<typeof getSearchPolicies>[0],
) => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [SEARCH_POLICY_QUERY_KEY.SEARCH_POLICIES, location.search],
    queryFn: () => getSearchPolicies(getSearchPoliciesProps),
  });

  return {
    ...data,
    ...restQuery,
  };
};
