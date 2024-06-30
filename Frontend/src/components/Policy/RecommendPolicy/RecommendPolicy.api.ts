import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { RecommendPolicy } from '@/types/common';

export interface GetRecommendPolicyResponse {
  recommendedPolicies: RecommendPolicy[];
}

export const getRecommendPolicy = async () => {
  try {
    const data = await indieroClient.get<GetRecommendPolicyResponse>(API_PATH.RECOMMEND_POLICY);

    if (!data) throw new Error('추천 정책을 불러오는 데 실패했습니다.');
    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
