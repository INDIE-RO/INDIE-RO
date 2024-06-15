import { useSuspenseQuery } from '@tanstack/react-query';

import { getFilterMeta } from '@/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList.api';

export const FILTER_QUERY_KEY = {
  FILTER_META: 'FILTER_META',
} as const;

export const useFilterMetaQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [FILTER_QUERY_KEY.FILTER_META],
    queryFn: getFilterMeta,
  });

  return {
    ageMeta: data.ages,
    regionMeta: data.regions,
    openingStatusMeta: data.openingStatuses,
    ...restQuery,
  };
};
