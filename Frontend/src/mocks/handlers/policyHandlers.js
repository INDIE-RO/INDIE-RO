import { HttpResponse, delay, http } from 'msw';

import { API_PATH } from '@/constants/path';
import policyFixture from '@/mocks/fixtures/policy';

const policyHandlers = [
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
];

export default policyHandlers;
