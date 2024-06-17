import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { Policy } from '@/types/common';

export interface GetSearchPolicyResponse {
  hasNext: boolean;
  totalCount: number;
  policies: Policy[];
}

export interface GetSearchPoliciesRequest
  extends Partial<
    Record<SearchKeywordForSearch | SearchKeywordForPaging | SearchKeywordForSort, string>
  > {}

export const SEARCH_KEYWORD_FOR_SEARCH = ['query'] as const;
export const SEARCH_KEYWORD_FOR_PAGING = ['size', 'lastPolicyId'] as const;
export const SEARCH_KEYWORD_FOR_SORT = ['sortBy'] as const;
export const SEARCH_KEYWORD_FOR_ALL = [
  ...SEARCH_KEYWORD_FOR_SEARCH,
  ...SEARCH_KEYWORD_FOR_PAGING,
  ...SEARCH_KEYWORD_FOR_SORT,
] as const;

export type SearchKeywordForSearch = (typeof SEARCH_KEYWORD_FOR_SEARCH)[number];
export type SearchKeywordForPaging = (typeof SEARCH_KEYWORD_FOR_PAGING)[number];
export type SearchKeywordForSort = (typeof SEARCH_KEYWORD_FOR_SORT)[number];
export type SearchKeywordForAll = (typeof SEARCH_KEYWORD_FOR_ALL)[number];

export const getSearchPolicies = async (getSearchPolicyRequest: GetSearchPoliciesRequest) => {
  try {
    const data = await indieroClient.get<GetSearchPolicyResponse>(API_PATH.POLICY_SEARCH, {
      params: getSearchPolicyRequest,
    });

    if (!data) throw new Error('정책 검색 결과를 불러오는 데 실패했습니다.');

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
