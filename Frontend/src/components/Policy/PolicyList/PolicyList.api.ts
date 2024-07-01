import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { Policy, SortMeta } from '@/types/common';

export interface GetPoliciesResponse {
  hasNext: boolean;
  totalCount: number;
  policies: Policy[];
}

export interface GetPoliciesRequest
  extends Partial<Record<KeywordForFilter | KeywordForPaging | KeywordForSort, string>> {}

export const KEYWORD_FOR_FILTER = ['categoryId', 'openingStatusId', 'ageId', 'regionIds'] as const;
export const KEYWORD_FOR_PAGING = ['size', 'lastPolicyId'] as const;
export const KEYWORD_FOR_SORT = ['sortBy'] as const;
export const KEYWORD_FOR_ALL = [
  ...KEYWORD_FOR_FILTER,
  ...KEYWORD_FOR_PAGING,
  ...KEYWORD_FOR_SORT,
] as const;

export type KeywordForFilter = (typeof KEYWORD_FOR_FILTER)[number];
export type KeywordForPaging = (typeof KEYWORD_FOR_PAGING)[number];
export type KeywordForSort = (typeof KEYWORD_FOR_SORT)[number];
export type KeywordForAll = (typeof KEYWORD_FOR_ALL)[number];

export const getPolicies = async (getPoliciesRequest: GetPoliciesRequest) => {
  try {
    const data = await indieroClient.get<GetPoliciesResponse>(API_PATH.POLICY_LIST, {
      params: getPoliciesRequest,
    });

    if (!data) throw new Error('정책목록을 불러오는 데 실패했습니다.');

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};

export interface GetSortMetaResponse {
  sortFields: SortMeta[];
}

export const getSortMeta = async () => {
  try {
    const data = await indieroClient.get<GetSortMetaResponse>(API_PATH.SORT_META);

    if (!data) throw new Error('정렬기준을 불러오는 데 실패했습니다.');

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
