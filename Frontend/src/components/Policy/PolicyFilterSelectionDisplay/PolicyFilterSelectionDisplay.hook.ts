import {
  KEYWORD_FOR_FILTER,
  KeywordForFilter,
} from '@/components/Policy/PolicyList/PolicyList.api';
import { useEasyNavigate, useValidQueryParams } from '@/hooks/@common';
import { generateQueryString } from '@/utils/route';

export const usePolicyFilterSelectionDisplay = () => {
  const { replaceQueryParams } = useEasyNavigate();
  const filterQueryParams = useValidQueryParams(KEYWORD_FOR_FILTER);

  const removeFilter = (keyword: KeywordForFilter, value: string) => {
    const valuesByFilter = filterQueryParams[keyword]?.split(',');

    if (!valuesByFilter) return;

    if (valuesByFilter.includes(value)) {
      valuesByFilter.splice(valuesByFilter.indexOf(value), 1);

      const newValueString = valuesByFilter.join(',');
      const newQueryString = generateQueryString({
        ...filterQueryParams,
        [keyword]: newValueString,
      });

      replaceQueryParams(newQueryString, { exclude: [] });
    }
  };

  return { filterQueryParams, removeFilter };
};
