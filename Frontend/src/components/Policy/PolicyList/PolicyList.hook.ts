import { useEffect, useState } from 'react';

import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import { generateQueryString, updateQueryString } from '@/utils/route';

export const usePolicySort = () => {
  const { navigate } = useEasyNavigate();
  const [sortBy, setSortBy] = useState(1);

  const changeSortBy = (value: number) => setSortBy(value);

  useEffect(() => {
    const newQueryString = updateQueryString(generateQueryString({ sortBy }));

    navigate(`${PATH.POLICY_LIST}${newQueryString}`);
  }, [sortBy]);

  return { sortBy, changeSortBy };
};
