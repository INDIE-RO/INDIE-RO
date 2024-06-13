import { HttpResponse, delay, http } from 'msw';

import { API_PATH } from '@/constants/path';

import filterFixture from '../fixtures/filter';

const filterHandlers = [
  http.get('/api' + API_PATH.FILTER_META, async () => {
    await delay(2000);
    return HttpResponse.json(filterFixture.getFilterMeta(), { status: 200 });
  }),
];

export default filterHandlers;
