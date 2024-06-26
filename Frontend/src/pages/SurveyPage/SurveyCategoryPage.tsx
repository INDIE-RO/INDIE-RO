import styled from '@emotion/styled';

import { ChipButton, ChipInput, ProgressBar } from '@/components/@common';
import theme from '@/styles/theme';

import { SURVEY_KEY } from './Survey.constant';
import useSurvey from './Survey.hook';
import { useSurveyCategoryMetaQuery } from './Survey.query';
import { SurveyValue } from './Survey.type';

interface SurveyCategoryPageProps {
  survey: SurveyValue;
  setSurvey: (value: SurveyValue) => void;
  onNext: (direction: 'prev' | 'next') => void;
}

function SurveyCategoryPage({ survey, setSurvey, onNext }: SurveyCategoryPageProps) {
  const { categoryMeta } = useSurveyCategoryMetaQuery();
  const { handleSelectedAll, handleChangeCategory } = useSurvey({ survey, setSurvey });

  const categoryMetaValue = categoryMeta?.map(category => category.name);

  return (
    <>
      <div>
        <div style={{ height: '20px' }} />
        <ProgressBar step={1} />
        <div style={{ height: '20px' }} />
        <Title>
          어떤 분야의 정책/지원사업 <br />
          정보가 필요하신가요?
        </Title>
        <div style={{ height: '14px' }} />
        <p>원하시는 분야의 정보를 큐레이팅해드려요</p>
        <div style={{ height: '24px' }} />
        <ChipInputWrapper>
          <ChipInput
            type='checkbox'
            checked={survey.category.length === categoryMetaValue?.length}
            variant='rounded'
            size='lg'
            width='100%'
            onChange={e => handleSelectedAll(e, SURVEY_KEY.CATEGORY, categoryMetaValue)}
          >
            전체 선택
          </ChipInput>
          {categoryMeta?.map(category => (
            <ChipInput
              key={category.id}
              type='checkbox'
              value={category.name}
              checked={survey.category.includes(category.name)}
              variant='rounded'
              size='lg'
              width='100%'
              onChange={handleChangeCategory}
            >
              {category.name}
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

export default SurveyCategoryPage;

const Title = styled.h1`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semiBold};
`;

const ChipInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 16px;
  width: calc(100% - 40px);

  @media screen and (min-width: 768px) {
    max-width: 390px;
  }
`;
