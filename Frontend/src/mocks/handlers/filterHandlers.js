import { HttpResponse, http } from 'msw';

import { API_PATH } from '@/constants/path';

import filterFixture from '../fixtures/filter';

const filterHandlers = [
  http.get('/api' + API_PATH.FILTER_META, () => {
    return HttpResponse.json(filterFixture.getFilterMeta(), { status: 200 });
  }),
];

export default filterHandlers;
