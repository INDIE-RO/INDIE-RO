import styled from '@emotion/styled';

import { BasicLayout, SearchBar } from '@/components/@common';
import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';

function Homepage() {
  const { search, changeSearchQuery } = usePolicySearch();

  return (
    <Section>
      <BasicLayout>
        <div style={{ height: '20px' }} />
        <Wrapper>
          <SearchBar updateQuery={changeSearchQuery} onClickSearch={search} />
        </Wrapper>
      </BasicLayout>
    </Section>
  );
}

export default Homepage;

const Section = styled.section``;

const Wrapper = styled.div`
  padding: 0 20px;
`;
