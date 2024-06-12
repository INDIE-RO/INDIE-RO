import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { Policy } from '@/types/common';

export interface GetPoliciesResponse {
  hasNext: boolean;
  totalCount: number;
  policies: Policy[];
}

export const getPolicies = async () => {
  try {
    const data = await indieroClient.get<GetPoliciesResponse>(API_PATH.POLICY_LIST);

    if (!data) throw new Error('정책목록을 불러오는 데 실패했습니다.');

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};