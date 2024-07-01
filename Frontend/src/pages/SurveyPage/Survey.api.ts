import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { AgeMeta, CategoryMeta, RegionMeta } from '@/types/common';

export interface GetSurveyCategoryMetaResponse {
  categories: CategoryMeta[];
}

export interface GetSurveyRegionMetaResponse {
  regions: RegionMeta[];
}

export interface GetSurveyAgeMetaResponse {
  ages: AgeMeta[];
}

export const getSurveyCategoryMeta = async () => {
  try {
    const { categories: categoryMeta } = await indieroClient.get<GetSurveyCategoryMetaResponse>(
      API_PATH.SURVEY_CATEGORY_META,
    );

    if (!categoryMeta) throw new Error('카테고리 메타 정보를 불러오는데 실패했습니다.');

    return categoryMeta;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};

export const getSurveyRegionMeta = async () => {
  try {
    const { regions: regionMeta } = await indieroClient.get<GetSurveyRegionMetaResponse>(
      API_PATH.SURVEY_REGION_META,
    );

    if (!regionMeta) throw new Error('지역 메타 정보를 불러오는데 실패했습니다.');

    return regionMeta;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};

export const getSurveyAgeMeta = async () => {
  try {
    const { ages: ageMeta } = await indieroClient.get<GetSurveyAgeMetaResponse>(
      API_PATH.SURVEY_AGE_META,
    );

    if (!ageMeta) throw new Error('나이 메타 정보를 불러오는데 실패했습니다.');

    return ageMeta;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
