import { HttpResponse, http } from 'msw';

import { API_PATH } from '@/constants/path';

import categoriesMeta from '../data/categories.json';

const surveyHandlers = [
  http.get('/api' + API_PATH.SURVEY_CATEGORY_META, () => {
    return HttpResponse.json(categoriesMeta, { status: 200 });
  }),
];

export default surveyHandlers;