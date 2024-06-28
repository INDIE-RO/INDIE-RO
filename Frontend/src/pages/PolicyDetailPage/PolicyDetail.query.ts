import { useSuspenseQuery } from '@tanstack/react-query';

import { getPolicyDetail } from './PolicyDetail.api';

export const POLICY_DETAIL_KEY = {
  POLICY_DETAIL: 'POLICY_DETAIL',
} as const;

export const usePolicyDetailQuery = (policyId: number) => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [POLICY_DETAIL_KEY.POLICY_DETAIL, policyId],
    queryFn: () => getPolicyDetail(policyId),
  });

  return {
    policyDetail: data,
    ...restQuery,
  };
};
