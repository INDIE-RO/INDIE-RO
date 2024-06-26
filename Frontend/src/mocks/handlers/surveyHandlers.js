import { HttpResponse, http } from 'msw';

import { API_PATH, BASE_URL } from '@/constants/path';

import ageMeta from '../data/ages.json';
import categoriesMeta from '../data/categories.json';
import regionsMeta from '../data/regions.json';

const surveyHandlers = [
  http.get(BASE_URL + '/api' + API_PATH.SURVEY_CATEGORY_META, () => {
    return HttpResponse.json(categoriesMeta, { status: 200 });
  }),

  http.get(BASE_URL + '/api' + API_PATH.SURVEY_REGION_META, () => {
    return HttpResponse.json(regionsMeta, { status: 200 });
  }),

  http.get(BASE_URL + '/api' + API_PATH.SURVEY_AGE_META, () => {
    return HttpResponse.json(ageMeta, { status: 200 });
  }),
];

export default surveyHandlers;
