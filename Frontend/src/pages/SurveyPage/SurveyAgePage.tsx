import styled from '@emotion/styled';

import { ChipButton, ChipInput, DialogConfirm, ProgressBar } from '@/components/@common';
import { PATH } from '@/constants/path';
import { useConfirm, useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';
import { indieroLocalStorage } from '@/utils/localStorage';

import useSurvey from './Survey.hook';
import { useSurveyAgeMetaQuery } from './Survey.query';
import { SurveyValue } from './Survey.type';

interface SurveyAgePageProps {
  survey: SurveyValue;
  setSurvey: (value: SurveyValue) => void;
}

function SurveyAgePage({ survey, setSurvey }: SurveyAgePageProps) {
  const { ageMeta } = useSurveyAgeMetaQuery();
  const { handleChangeAge } = useSurvey({ survey, setSurvey });

  const { navigate } = useEasyNavigate();

  const handleCompleteStep = () => {
    indieroLocalStorage.setSurvey(survey);
    navigate(PATH.LOADING);

    setTimeout(() => {
      navigate(PATH.CUSTOM_INFO);
    }, 2000);
  };

  return (
    <>
      <div>
        <div style={{ height: '20px' }} />
        <ProgressBar step={3} />
        <div style={{ height: '20px' }} />
        <Title>만 나이를 알려주세요!</Title>
        <div style={{ height: '14px' }} />
        <p>연령대에 맞는 정보들을 추천해드려요</p>
        <div style={{ height: '60px' }} />
        <ChipInputWrapper>
          {ageMeta?.map(age => (
            <ChipInput
              key={age.id}
              type='checkbox'
              value={age.name}
              checked={survey.age === age.name}
              variant='rounded'
              size='lg'
              width='100%'
              onChange={handleChangeAge}
            >
              {age.name}
            </ChipInput>
          ))}
        </ChipInputWrapper>
      </div>

      <DialogConfirm onClick={handleCompleteStep}>
        <ButtonWrapper>
          <ChipButton type='button' size='lg' width='100%'>
            완료
          </ChipButton>
        </ButtonWrapper>
      </DialogConfirm>
    </>
  );
}

export default SurveyAgePage;

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
