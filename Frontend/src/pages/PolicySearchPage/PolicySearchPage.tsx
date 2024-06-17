import { Suspense, useRef } from 'react';

import styled from '@emotion/styled';

import { BasicLayout, ScrollButton, SearchBar } from '@/components/@common';
import { PolicyList } from '@/components/Policy';
import { useValidQueryParams } from '@/hooks/@common';
import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';

import { SEARCH_KEYWORD_FOR_SEARCH, SearchKeywordForSearch } from './PolicySearch.api';
import PolicySearchListContainer from './PolicySearchListContainer';

function PolicySearchPage() {
  const { search, changeSearchQuery } = usePolicySearch();
  const { query } = useValidQueryParams<SearchKeywordForSearch>(SEARCH_KEYWORD_FOR_SEARCH);

  const searchRef = useRef<HTMLDivElement>(null);

  return (
    <BasicLayout>
      <section ref={searchRef}>
        <div style={{ height: '20px' }} />
        <Wrapper>
          <SearchBar updateQuery={changeSearchQuery} onClickSearch={search} placeholder={query} />
          <div style={{ height: '20px' }} />

          <Suspense fallback={<PolicyList.Skeleton />}>
            <PolicySearchListContainer />
          </Suspense>

          <ScrollButton targetRef={searchRef} />
        </Wrapper>
      </section>
    </BasicLayout>
  );
}

export default PolicySearchPage;

const Wrapper = styled.div`
  padding: 0 20px;
`;
