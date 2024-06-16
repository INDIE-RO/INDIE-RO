import { HttpResponse, delay, http } from 'msw';

import { API_PATH } from '@/constants/path';
import policyFixture from '@/mocks/fixtures/policy';

import policyDetail from '../data/policyDetail.json';

const policyHandlers = [
  http.get('/api' + API_PATH.POLICY_LIST, async ({ request }) => {
    const url = new URL(request.url);
    const regionIds = url.searchParams.get('regionIds');
    const categoryId = url.searchParams.get('categoryId');

    await delay(2000);

    if (categoryId === '2')
      return HttpResponse.json(policyFixture.getPolicyListByCategory(), { status: 200 });
    if (regionIds) return HttpResponse.json(policyFixture.getPolicyListByRegion(), { status: 200 });

    return HttpResponse.json(policyFixture.getPolicyList(), { status: 200 });
  }),

  http.get('/api/policies/:id', async ({ request }) => {
    // 나중에 id로 정책 상세 정보를 가져올 때를 대비해 작성
    const url = new URL(request.url);
    const policyId = url.pathname.split('/').pop();

    return HttpResponse.json(policyDetail, { status: 200 });
  }),
];

export default policyHandlers;
