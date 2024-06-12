import { PropsWithChildren, createContext, useMemo, useState } from 'react';

import { useContextInScope } from '@/hooks/@common';

import { SurveyValue } from './Survey.type';

const INITIAL_SURVEY_STATE: SurveyValue = {
  category: [],
  region: [],
  age: '',
};

interface SurveyContext {
  inScope: boolean;
  survey: SurveyValue;
  updateSurvey: (newValue: Partial<SurveyValue>) => void;
}

const SurveyContext = createContext<SurveyContext>({
  inScope: false,
  survey: INITIAL_SURVEY_STATE,
  updateSurvey: () => {},
});

const SURVEY_NAME = 'Survey';
SurveyContext.displayName = SURVEY_NAME;

export const useSurveyContext = () => useContextInScope(SurveyContext);

function SurveyProvider({ children }: PropsWithChildren) {
  const [survey, setSurvey] = useState<SurveyValue>(INITIAL_SURVEY_STATE);

  const updateSurvey = (newValue: Partial<SurveyValue>) => {
    setSurvey({ ...survey, ...newValue });
  };

  const memoizedValue = useMemo(
    () => ({
      inScope: true,
      survey,
      updateSurvey,
    }),
    [survey],
  );

  return <SurveyContext.Provider value={memoizedValue}>{children}</SurveyContext.Provider>;
}

export default SurveyProvider;
