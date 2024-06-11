import styled from '@emotion/styled';

import { ChipButton, NavigableHeader } from '@/components/@common';

import SurveyCategoryPage from './SurveyCategoryPage';
import SurveyRegionPage from './SurveyRegionPage';

function SurveyPage() {
  return (
    <>
      <NavigableHeader />
      <Container>
        <SurveyRegionPage />
        <ButtonWrapper>
          <ChipButton size='lg' width='100%'>
            다음
          </ChipButton>
        </ButtonWrapper>
      </Container>
    </>
  );
}

export default SurveyPage;

const Container = styled.section`
  position: relative;
  padding: 4.8rem 2rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  width: calc(100% - 40px);
`;
