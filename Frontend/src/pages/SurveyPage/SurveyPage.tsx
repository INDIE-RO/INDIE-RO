import { useState } from 'react';

import styled from '@emotion/styled';

import { NavigableHeader } from '@/components/@common';
import { useFunnel } from '@/hooks/@common';

import { STEP } from './Survey.constant';
import useSurvey from './Survey.hook';
import { SurveyValue } from './Survey.type';
import SurveyAgePage from './SurveyAgePage';
import SurveyCategoryPage from './SurveyCategoryPage';
import SurveyRegionPage from './SurveyRegionPage';

const INITIAL_SURVEY_STATE: SurveyValue = {
  category: [],
  region: [],
  age: '',
};

function SurveyPage() {
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEP[0]);

  const [survey, setSurvey] = useState<SurveyValue>(INITIAL_SURVEY_STATE);

  const handleChangeStep = (direction: 'prev' | 'next') => {
    const currentIndex = STEP.findIndex(step => step === currentStep);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < STEP.length) {
      setStep(STEP[newIndex]);
    }
  };

  return (
    <>
      <NavigableHeader
        onPrev={currentStep !== STEP[0] ? () => handleChangeStep('prev') : undefined}
      />
      <Container>
        <Funnel>
          <Step name='CATEGORY'>
            <SurveyCategoryPage survey={survey} setSurvey={setSurvey} onNext={handleChangeStep} />
          </Step>
          <Step name='REGION'>
            <SurveyRegionPage survey={survey} setSurvey={setSurvey} onNext={handleChangeStep} />
          </Step>
          <Step name='AGE'>
            <SurveyAgePage survey={survey} setSurvey={setSurvey} />
          </Step>
        </Funnel>
      </Container>
    </>
  );
}

export default SurveyPage;

const Container = styled.section`
  position: relative;
  padding: 4.8rem 2rem;
`;
