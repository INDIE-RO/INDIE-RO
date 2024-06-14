import styled from '@emotion/styled';

import { NavigableHeader } from '@/components/@common';
import { useFunnel } from '@/hooks/@common';

import { STEP } from './Survey.constant';
import SurveyAgePage from './SurveyAgePage';
import SurveyCategoryPage from './SurveyCategoryPage';
import SurveyRegionPage from './SurveyRegionPage';

function SurveyPage() {
  const { Funnel, Step, setStep, currentStep } = useFunnel(STEP[0]);

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
            <SurveyCategoryPage onNext={handleChangeStep} />
          </Step>
          <Step name='REGION'>
            <SurveyRegionPage onNext={handleChangeStep} />
          </Step>
          <Step name='AGE'>
            <SurveyAgePage />
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
