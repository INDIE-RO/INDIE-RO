import { useEffect, useState } from 'react';

import { useEasyNavigate } from '@/hooks/@common';
import { generateQueryString } from '@/utils/route';

export const usePolicySort = () => {
  const { updateQueryParams } = useEasyNavigate();
  const [sortBy, setSortBy] = useState(1);

  const changeSortBy = (value: number) => setSortBy(value);

  useEffect(() => {
    updateQueryParams(generateQueryString({ sortBy }));
  }, [sortBy]);

  return { sortBy, changeSortBy };
};
