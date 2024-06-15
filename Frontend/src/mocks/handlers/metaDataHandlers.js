import { HttpResponse, http } from 'msw';

import { API_PATH } from '@/constants/path';

import metaDataFixture from '../fixtures/metaData';

const metaDataHandlers = [
  http.get('/api' + API_PATH.FILTER_META, () => {
    return HttpResponse.json(metaDataFixture.getFilterMeta(), { status: 200 });
  }),

  http.get('/api' + API_PATH.SORT_META, () => {
    return HttpResponse.json(metaDataFixture.getSortMeta(), { status: 200 });
  }),
];

export default metaDataHandlers;
