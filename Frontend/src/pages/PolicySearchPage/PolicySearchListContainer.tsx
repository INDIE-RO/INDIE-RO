import styled from '@emotion/styled';

import { Dropdown } from '@/components/@common';
import { PolicyList } from '@/components/Policy';
import { usePolicySort } from '@/components/Policy/PolicyList/PolicyList.hook';
import { useSortMetaQuery } from '@/components/Policy/PolicyList/PolicyList.query';
import { useValidQueryParams } from '@/hooks/@common';
import theme from '@/styles/theme';

import { SEARCH_KEYWORD_FOR_ALL, SearchKeywordForAll } from './PolicySearch.api';
import { useSearchPoliciesQuery } from './PolicySearch.query';

function PolicySearchListContainer() {
  const queryParams = useValidQueryParams<SearchKeywordForAll>(SEARCH_KEYWORD_FOR_ALL);
  const { policies, totalCount } = useSearchPoliciesQuery(queryParams);
  const { sortMeta } = useSortMetaQuery();
  const { changeSortBy } = usePolicySort();

  return (
    <>
      <FlexBox>
        <p>{`검색결과(${totalCount})`}</p>
        <Dropdown metaData={sortMeta} onClickOption={changeSortBy} />
      </FlexBox>
      <div style={{ height: '8px' }} />
      <PolicyList policies={policies} />
    </>
  );
}

export default PolicySearchListContainer;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
`;
