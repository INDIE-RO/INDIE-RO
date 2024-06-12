import { HttpResponse, delay, http } from 'msw';

import { API_PATH } from '@/constants/path';
import policyFixture from '@/mocks/fixtures/policy';

const policyHandlers = [
  http.get('/api' + API_PATH.POLICY_LIST, async () => {
    await delay(2000);
    return HttpResponse.json(policyFixture.getPolicyList(), { status: 200 });
  }),
];

export default policyHandlers;
