import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { Policy } from '@/types/common';

export interface GetCustomPoliciesResponse {
  hasNext: boolean;
  totalCount: number;
  policies: Policy[];
}

export interface GetCustomPoliciesRequest
  extends Partial<
    Record<CustomKeywordForFilter | CustomKeywordForPaging | CustomKeywordForSort, string>
  > {}

export const CUSTOM_KEYWORD_FOR_FILTER = ['categoryIds', 'ageId', 'regionIds'] as const;
export const CUSTOM_KEYWORD_FOR_PAGING = ['size', 'lastPolicyId'] as const;
export const CUSTOM_KEYWORD_FOR_SORT = ['sortBy'] as const;
export const CUSTOM_KEYWORD_FOR_ALL = [
  ...CUSTOM_KEYWORD_FOR_FILTER,
  ...CUSTOM_KEYWORD_FOR_PAGING,
  ...CUSTOM_KEYWORD_FOR_SORT,
] as const;

export type CustomKeywordForFilter = (typeof CUSTOM_KEYWORD_FOR_FILTER)[number];
export type CustomKeywordForPaging = (typeof CUSTOM_KEYWORD_FOR_PAGING)[number];
export type CustomKeywordForSort = (typeof CUSTOM_KEYWORD_FOR_SORT)[number];
export type CustomKeywordForAll = (typeof CUSTOM_KEYWORD_FOR_ALL)[number];

export const getCustomPolicies = async (getCustomPoliciesRequest: GetCustomPoliciesRequest) => {
  try {
    const data = await indieroClient.get<GetCustomPoliciesResponse>(API_PATH.CUSTOM_INFO, {
      params: getCustomPoliciesRequest,
    });

    if (!data) throw new Error('맞춤 정책목록을 불러오는 데 실패했습니다.');

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
