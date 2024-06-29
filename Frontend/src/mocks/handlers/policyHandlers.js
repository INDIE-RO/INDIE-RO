import { HttpResponse, delay, http } from 'msw';

import { API_PATH, BASE_URL } from '@/constants/path';
import categoryMeta from '@/mocks/data/categories.json';
import openingStatusMeta from '@/mocks/data/openingStatus.json';
import policiesResponse from '@/mocks/data/policies.json';
import regionMeta from '@/mocks/data/regions.json';

import policyDetail from '../data/policyDetail.json';

const policyHandlers = [
  /* 정책 검색 결과 조회 */
  http.get(BASE_URL + '/api' + API_PATH.POLICY_SEARCH, async ({ request }) => {
    const url = new URL(request.url);
    const sortBy = parseInt(url.searchParams.get('sortBy'));
    const searchQuery = url.searchParams.get('query') ?? '';

    const { policies, ...restResponse } = policiesResponse;

    // 키워드 검색
    const searchedPolicies = policies.filter(policy => policy.title.includes(searchQuery));

    // 정렬
    const sortedPolicies = sortPolicies(searchedPolicies, sortBy);

    const totalCount = sortedPolicies.length;

    await delay(1000);

    return HttpResponse.json(
      { ...restResponse, totalCount, policies: sortedPolicies },
      { status: 200 },
    );
  }),

  /* 맞춤 정책목록 조회 */
  http.get(BASE_URL + '/api' + API_PATH.CUSTOM_INFO, async ({ request }) => {
    const url = new URL(request.url);
    const sortBy = parseInt(url.searchParams.get('sortBy'));
    const categoryIds = url.searchParams.get('categoryIds')?.split(',').map(parseInt);
    const regionIds = url.searchParams.get('regionIds')?.split(',').map(parseInt);

    const { policies, ...restResponse } = policiesResponse;

    // 필터링(정책분야, 모집현황, 지역)
    const filteredPolicies = filterPolicies({
      policies,
      categoryIds,
      regionIds,
    });

    // 정렬
    const sortedPolicies = sortPolicies(filteredPolicies, sortBy);

    const totalCount = sortedPolicies.length;

    await delay(1000);

    return HttpResponse.json(
      { ...restResponse, totalCount, policies: sortedPolicies },
      { status: 200 },
    );
  }),

  /* 정책목록 조회 */
  http.get(BASE_URL + '/api' + API_PATH.POLICY_LIST, async ({ request }) => {
    const url = new URL(request.url);
    const sortBy = parseInt(url.searchParams.get('sortBy'));
    const categoryId = parseInt(url.searchParams.get('categoryId')) ?? 1;
    const openingStatusId = parseInt(url.searchParams.get('openingStatusId'));
    const regionIds = url.searchParams.get('regionIds')?.split(',').map(parseInt);

    const { policies, ...restResponse } = policiesResponse;

    // 필터링(정책분야, 모집현황, 지역)
    const filteredPolicies = filterPolicies({
      policies,
      categoryId,
      openingStatusId,
      regionIds,
    });

    // 정렬
    const sortedPolicies = sortPolicies(filteredPolicies, sortBy);

    const totalCount = sortedPolicies.length;

    await delay(1000);

    return HttpResponse.json(
      { ...restResponse, totalCount, policies: sortedPolicies },
      { status: 200 },
    );
  }),

  http.get(BASE_URL + '/api' + API_PATH.POLICY_DETAIL, async ({ request }) => {
    // 나중에 id로 정책 상세 정보를 가져올 때를 대비해 작성
    const url = new URL(request.url);
    const policyId = url.pathname.split('/').pop();

    return HttpResponse.json(policyDetail, { status: 200 });
  }),
];

export default policyHandlers;

// 정책 목록을 정렬하는 함수
function sortPolicies(policies, sortBy) {
  // 마감순 정렬 (조회순 정렬은 조회수 데이터 없어서 모킹 안함)
  if (sortBy !== 1) return policies;

  const statusOrder = ['모집중', '모집예정', '상시모집', '마감'];

  return policies.sort((a, b) => {
    const statusA = statusOrder.indexOf(a.tags.find(tag => tag.type === '모집현황').name);
    const statusB = statusOrder.indexOf(b.tags.find(tag => tag.type === '모집현황').name);

    // 모집 상태가 같을 때는 디데이로 정렬
    if (statusA === statusB) {
      const dDayA = a.tags.find(tag => tag.type === '디데이').name.replace('D-', '');
      const dDayB = b.tags.find(tag => tag.type === '디데이').name.replace('D-', '');
      return parseInt(dDayA) - parseInt(dDayB);
    }

    return statusA - statusB;
  });
}

// 정책 목록을 필터링하는 함수
function filterPolicies({ policies, categoryId, openingStatusId, regionIds, categoryIds }) {
  const { openingStatuses } = openingStatusMeta;
  const { categories } = categoryMeta;
  const { regions } = regionMeta;

  const openingStatusName = getNameById(openingStatusId, openingStatuses);
  const categoryName = getNameById(categoryId, categories);
  const categoryNames = getNamesByIds(categoryIds, categories);
  const regionNames = getNamesByIds(regionIds, regions);

  return policies.filter(policy => {
    const matchesOpeningStatus = openingStatusId
      ? policy.tags.some(tag => tag.type === '모집현황' && tag.name === openingStatusName)
      : true;

    // 정책 모두보기 필터링
    const matchesCategory = categoryId
      ? policy.tags.some(tag => tag.type === '분야' && tag.name === categoryName)
      : true;

    // 맞춤정책 필터링
    const matchesCategories = categoryIds
      ? policy.tags.some(tag => tag.type === '분야' && categoryNames.includes(tag.name))
      : true;

    const matchesRegions = regionIds
      ? policy.tags.some(tag => tag.type === '지역' && regionNames.includes(tag.name))
      : true;

    return matchesOpeningStatus && matchesCategory && matchesCategories && matchesRegions;
  });
}

function getNameById(id, metaList) {
  const metaItem = metaList.find(meta => parseInt(meta.id) === parseInt(id));

  return metaItem ? metaItem.name : null;
}

function getNamesByIds(ids, metaList) {
  return Array.isArray(ids) && ids.map(id => getNameById(id, metaList));
}
