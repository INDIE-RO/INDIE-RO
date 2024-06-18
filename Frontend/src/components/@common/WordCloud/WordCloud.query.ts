import { useSuspenseQuery } from '@tanstack/react-query';

import { getWordCloud } from '@/components/@common/WordCloud/WordCloud.api';

export const WORD_CLOUD_QUERY_KEY = {
  WORDS: 'WORDS',
} as const;

export const useWordCloudQuery = () => {
  const { data, ...restQuery } = useSuspenseQuery({
    queryKey: [WORD_CLOUD_QUERY_KEY.WORDS],
    queryFn: getWordCloud,
  });

  return {
    words: data,
    ...restQuery,
  };
};
