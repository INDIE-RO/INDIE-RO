import { HttpResponse, delay, http } from 'msw';

import { API_PATH } from '@/constants/path';
import policyFixture from '@/mocks/fixtures/policy';

import policyDetail from '../data/policyDetail.json';

const policyHandlers = [
  /* 정책 검색 결과 조회 */
  http.get('/api' + API_PATH.POLICY_SEARCH, async ({ request }) => {
    const url = new URL(request.url);
    const sortBy = url.searchParams.get('sortBy');
    const searchQuery = url.searchParams.get('query');

    const hasSearchValue = policyFixture
      .getPolicyList()
      .policies.some(item => item.title.includes(searchQuery));

    if (hasSearchValue) {
      return HttpResponse.json(policyFixture.getPolicyList(), { status: 200 });
    } else {
      return HttpResponse.json(policyFixture.getPolicyListEmpty(), { status: 200 });
    }
  }),

  /* 맞춤 정책목록 조회 */
  http.get('/api' + API_PATH.CUSTOM_INFO, async ({ request }) => {
    const url = new URL(request.url);
    const regionIds = url.searchParams.get('regionIds');
    const categoryIds = url.searchParams.get('categoryIds');
    const sortBy = url.searchParams.get('sortBy');

    await delay(200);

    if (categoryIds && categoryIds.includes('2'))
      return HttpResponse.json(policyFixture.getPolicyListByCategory(), { status: 200 });
    if (regionIds) return HttpResponse.json(policyFixture.getPolicyListByRegion(), { status: 200 });

    return HttpResponse.json(policyFixture.getPolicyList(), { status: 200 });
  }),

  /* 정책목록 조회 */
  http.get('/api' + API_PATH.POLICY_LIST, async ({ request }) => {
    const url = new URL(request.url);
    const regionIds = url.searchParams.get('regionIds');
    const categoryId = url.searchParams.get('categoryId');
    const sortBy = url.searchParams.get('sortBy');

    await delay(2000);

    if (categoryId === '2')
      return HttpResponse.json(policyFixture.getPolicyListByCategory(), { status: 200 });
    if (regionIds) return HttpResponse.json(policyFixture.getPolicyListByRegion(), { status: 200 });

    return HttpResponse.json(policyFixture.getPolicyList(), { status: 200 });
  }),

  http.get('/api' + API_PATH.POLICY_DETAIL, async ({ request }) => {
    // 나중에 id로 정책 상세 정보를 가져올 때를 대비해 작성
    const url = new URL(request.url);
    const policyId = url.pathname.split('/').pop();

    return HttpResponse.json(policyDetail, { status: 200 });
  }),
];

export default policyHandlers;
