import { ChangeEvent } from 'react';

import { SurveyValue } from './Survey.type';

interface useSurveyProps {
  survey: SurveyValue;
  setSurvey: (newValue: SurveyValue) => void;
}

const useSurvey = ({ survey, setSurvey }: useSurveyProps) => {
  const updateSurvey = (newValue: Partial<SurveyValue>) => {
    setSurvey({ ...survey, ...newValue });
  };

  const handleSelectedAll = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof SurveyValue,
    values: SurveyValue[keyof SurveyValue][],
  ) => {
    const checked = e.target.checked;

    if (checked) {
      updateSurvey({ ...survey, [key]: values });
      return;
    }
    updateSurvey({ ...survey, [key]: [] });
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      updateSurvey({ category: [...survey.category, category] });
      return;
    }
    updateSurvey({
      category: survey.category.filter(item => item !== category),
    });
  };

  const handleChangeRegion = (e: ChangeEvent<HTMLInputElement>) => {
    const region = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      updateSurvey({ region: [region] });
      return;
    }
  };

  const handleChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const age = e.target.value;

    updateSurvey({ age });
  };

  return {
    survey,
    updateSurvey,
    handleSelectedAll,
    handleChangeCategory,
    handleChangeRegion,
    handleChangeAge,
  };
};

export default useSurvey;
