import { useSuspenseQuery } from '@tanstack/react-query';

import { getPolicies, getSortMeta } from './PolicyList.api';

export const POLICY_QUERY_KEY = {
  POLICIES: 'POLICIES',
  SORT_META: 'SORT_META',
} as const;

export const usePoliciesQuery = (getPoliciesProps: Parameters<typeof getPolicies>[0]) => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [POLICY_QUERY_KEY.POLICIES, location.search],
    queryFn: () => getPolicies(getPoliciesProps),
  });

  return {
    ...data,
    ...restQuery,
  };
};

export const useSortMetaQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [POLICY_QUERY_KEY.SORT_META],
    queryFn: getSortMeta,
  });

  return {
    sortMeta: data.sortFields,
    ...restQuery,
  };
};
