import { ChangeEvent, useState } from 'react';

import { API_PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import { generateQueryString } from '@/utils/route';

export const usePolicySearch = () => {
  const { replaceQueryParams } = useEasyNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const changeSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const search = () => {
    replaceQueryParams(generateQueryString({ query: searchQuery }), {
      path: API_PATH.POLICY_SEARCH,
      exclude: ['sortBy'],
    });
  };

  return { changeSearchQuery, search };
};
