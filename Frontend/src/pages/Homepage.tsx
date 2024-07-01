import ReactGA from 'react-ga4';

import styled from '@emotion/styled';

import { BasicLayout, ChipButton, SearchBarContainer, WordCloud } from '@/components/@common';
import { RecommendedPolicy } from '@/components/Policy';
import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';
import theme from '@/styles/theme';

const HASH_TAGS = ['자립준비청년', '지원금', '취업'] as const;

function Homepage() {
  const { search } = usePolicySearch();

  const handleTagClick = (tag: string) => {
    ReactGA.event({
      category: '버튼',
      action: '핵심 키워드 클릭',
      label: 'tag-keyword',
    });

    search(tag);
  };

  return (
    <Section>
      <BasicLayout>
        <div style={{ height: '20px' }} />
        <Wrapper>
          <SearchBarContainer />
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
                  onClick={() => handleTagClick(tag)}
                >
                  {`# ${tag}`}
                </ChipButton>
              </li>
            ))}
          </TagContainer>
        </Wrapper>
        <div style={{ height: '45px' }} />
        <RecommendedPolicy />
        <div style={{ height: '45px' }} />
        <Wrapper>
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
