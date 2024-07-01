import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { WordCloud } from '@/types/common';

export interface GetWordCloudResponse {
  words: WordCloud[];
}

export const getWordCloud = async () => {
  try {
    const { words } = await indieroClient.get<GetWordCloudResponse>(API_PATH.WORD_CLOUD);

    if (!words) throw new Error('워드 클라우드를 불러오는 데 실패했습니다.');

    return words;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
