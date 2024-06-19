import styled from '@emotion/styled';

import { ChipButton, ChipInput, ProgressBar } from '@/components/@common';
import theme from '@/styles/theme';

import { SURVEY_KEY } from './Survey.constant';
import useSurvey from './Survey.hook';
import { useSurveyRegionMetaQuery } from './Survey.query';
import { SurveyValue } from './Survey.type';

const itemsPerRow = 3;
const gap = 0.8;
const width = `calc((100% - ${gap * (itemsPerRow - 1)}rem) / ${itemsPerRow})`;

interface SurveyRegionPageProps {
  survey: SurveyValue;
  setSurvey: (value: SurveyValue) => void;
  onNext: (direction: 'prev' | 'next') => void;
}

function SurveyRegionPage({ survey, setSurvey, onNext }: SurveyRegionPageProps) {
  const { regionMeta } = useSurveyRegionMetaQuery();
  const { handleSelectedAll, handleChangeRegion } = useSurvey({ survey, setSurvey });

  const regionMetaValue = regionMeta?.map(region => region.name);

  return (
    <>
      <div>
        <div style={{ height: '20px' }} />
        <ProgressBar step={2} />
        <div style={{ height: '20px' }} />
        <Title>
          어떤 지역의 정책/지원사업
          <br />
          정보가 필요하신가요?
        </Title>
        <div style={{ height: '14px' }} />
        <p>주변 지역 정보를 제공해드려요</p>
        <div style={{ height: '24px' }} />
        <ChipInputWrapper>
          <ChipInput
            type='checkbox'
            checked={survey.region.length === regionMetaValue?.length}
            width={width}
            border-radius='8px'
            onChange={e => handleSelectedAll(e, SURVEY_KEY.REGION, regionMetaValue)}
          >
            전체
          </ChipInput>
          {regionMeta?.map(region => (
            <ChipInput
              key={region.id}
              type='checkbox'
              value={region.name}
              checked={survey.region.includes(region.name)}
              width={width}
              border-radius='8px'
              onChange={handleChangeRegion}
            >
              {region.name}
            </ChipInput>
          ))}
        </ChipInputWrapper>
      </div>
      <ButtonWrapper>
        <ChipButton size='lg' width='100%' onClick={() => onNext('next')}>
          다음
        </ChipButton>
      </ButtonWrapper>
    </>
  );
}

export default SurveyRegionPage;

const Title = styled.h1`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semiBold};
`;

const ChipInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  width: calc(100% - 40px);

  @media screen and (min-width: 768px) {
    max-width: 390px;
  }
`;
