import { HttpResponse, delay, http } from 'msw';

import { API_PATH } from '@/constants/path';
import policyFixture from '@/mocks/fixtures/policy';

const policyHandlers = [
  http.get('/api' + API_PATH.POLICY_LIST, async ({ request }) => {
    const url = new URL(request.url);
    const regionIds = url.searchParams.get('regionIds');

    await delay(2000);

    if (regionIds) return HttpResponse.json(policyFixture.getPolicyListByRegion(), { status: 200 });

    return HttpResponse.json(policyFixture.getPolicyList(), { status: 200 });
  }),
];

export default policyHandlers;
