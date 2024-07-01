import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { RecommendedPolicy } from '@/types/common';
import { indieroLocalStorage } from '@/utils/localStorage';

export interface GetRecommendedPolicyResponse {
  recommendedPolicies: RecommendedPolicy[];
}

const recentViewedPolicyId = indieroLocalStorage.getRecentViewedPolicyId();

export const getRecommendedPolicy = async () => {
  try {
    const data = await indieroClient.get<GetRecommendedPolicyResponse>(API_PATH.RECOMMEND_POLICY, {
      params: { id: recentViewedPolicyId },
    });

    if (!data) throw new Error('추천 정책을 불러오는 데 실패했습니다.');
    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
