import { HttpResponse, http } from 'msw';

import { API_PATH, BASE_URL } from '@/constants/path';

import wordCloud from '../data/wordCloud.json';

const wordCloudHandlers = [
  http.get(BASE_URL + '/api' + API_PATH.WORD_CLOUD, () => {
    return HttpResponse.json(wordCloud, { status: 200 });
  }),
];

export default wordCloudHandlers;
