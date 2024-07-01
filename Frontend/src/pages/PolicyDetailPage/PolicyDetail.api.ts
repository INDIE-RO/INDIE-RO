import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';

import { PolicyDetail } from './PolicyDetail.type';

export const getPolicyDetail = async (policyId: number) => {
  try {
    const data = await indieroClient.get<PolicyDetail>(`${API_PATH.POLICY_LIST}/${policyId}`);

    if (!data) throw new Error('정책 상세 정보를 불러오는 데 실패했습니다.');

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
