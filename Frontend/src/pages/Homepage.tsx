import styled from '@emotion/styled';

import { BasicLayout, ChipButton, SearchBar, WordCloud } from '@/components/@common';
import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';
import theme from '@/styles/theme';

const HASH_TAGS = ['자립준비청년', '지원금', '취업'] as const;

function Homepage() {
  const { search, changeSearchQuery } = usePolicySearch();

  return (
    <Section>
      <BasicLayout>
        <div style={{ height: '20px' }} />
        <Wrapper>
          <SearchBar updateQuery={changeSearchQuery} onClickSearch={search} />
          <div style={{ height: '16px' }} />
          <TagContainer>
            {HASH_TAGS.map(tag => (
              <li key={tag}>
                <ChipButton
                  variant='rounded'
                  size='sm'
                  backgroundColor={theme.colors.gray6}
                  color={theme.colors.primary}
                  fontSize={theme.fontSizes.sm}
                  fontWeight={theme.fontWeights.semiBold}
                  onClick={() => search(tag)}
                >
                  {`# ${tag}`}
                </ChipButton>
              </li>
            ))}
          </TagContainer>
          <div style={{ height: '45px' }} />
          <WordCloudTitle>실시간 인기 키워드</WordCloudTitle>
          <div style={{ height: '12px' }} />
          <WordCloudWrapper>
            <WordCloud />
          </WordCloudWrapper>
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

const TagContainer = styled.ul`
  display: flex;
  gap: 0.8rem;
`;

const WordCloudTitle = styled.h1`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
`;

const WordCloudWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
