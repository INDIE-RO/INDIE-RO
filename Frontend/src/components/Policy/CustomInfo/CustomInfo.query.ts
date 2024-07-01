import { useQuery } from '@tanstack/react-query';

import {
  CUSTOM_KEYWORD_FOR_FILTER,
  getCustomPolicies,
} from '@/components/Policy/CustomInfo/CustomInfo.api';

export const CUSTOM_POLICY_QUERY_KEY = {
  CUSTOM_POLICIES: 'CUSTOM_POLICIES',
} as const;

export const useCustomPoliciesQuery = (
  getCustomPoliciesProps: Parameters<typeof getCustomPolicies>[0],
) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [CUSTOM_POLICY_QUERY_KEY.CUSTOM_POLICIES, location.search],
    queryFn: () => getCustomPolicies(getCustomPoliciesProps),
    enabled: Object.keys(getCustomPoliciesProps).includes(CUSTOM_KEYWORD_FOR_FILTER[0])
      ? true
      : false,
  });

  return {
    ...data,
    ...restQuery,
  };
};
