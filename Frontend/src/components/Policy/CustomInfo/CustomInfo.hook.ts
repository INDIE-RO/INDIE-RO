import { useLayoutEffect } from 'react';
import ReactGA from 'react-ga4';

import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import {
  useSurveyAgeMetaQuery,
  useSurveyCategoryMetaQuery,
  useSurveyRegionMetaQuery,
} from '@/pages/SurveyPage/Survey.query';
import { indieroLocalStorage } from '@/utils/localStorage';
import { generateQueryString } from '@/utils/route';

export const useCustomInfo = () => {
  const { ageMeta } = useSurveyAgeMetaQuery();
  const { categoryMeta } = useSurveyCategoryMetaQuery();
  const { regionMeta } = useSurveyRegionMetaQuery();
  const { updateQueryParams, navigate } = useEasyNavigate();

  const surveyResult = indieroLocalStorage.getSurvey();

  /**
   * 로컬스토리지에 저장된 설문조사 결과 값으로부터 쿼리 파라미터를 생성하는 함수
   * 로컬스토리지에 메타데이터 id값을 저장하는 경우 삭제할 것
   */
  const getCustomInfoQueryParams = () => {
    if (surveyResult) {
      const { category, region, age } = surveyResult;

      const categoryIds = categoryMeta
        ?.filter(metaData => category.includes(metaData.name))
        ?.map(metaData => String(metaData.id));

      const regionIds = regionMeta
        ?.filter(metaData => region.includes(metaData.name))
        .map(metaData => String(metaData.id));

      const ageId = String(ageMeta?.find(metaData => age === metaData.name)?.id);

      return {
        categoryIds,
        regionIds,
        ageId,
      };
    }

    return {};
  };

  const goSurveyPage = () => {
    ReactGA.event({
      category: '버튼',
      action: '설문조사 페이지로 이동',
      label: 'survey',
    });

    navigate(PATH.SURVEY);
  };

  const navigateCustomInfo = () => {
    updateQueryParams(generateQueryString(getCustomInfoQueryParams()), { path: PATH.CUSTOM_INFO });
  };

  useLayoutEffect(() => {
    navigateCustomInfo();
  }, []);

  return { surveyResult, goSurveyPage };
};
