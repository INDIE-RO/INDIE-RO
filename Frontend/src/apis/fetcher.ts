import { ERROR_MESSAGE } from '@/constants/error';
import { BASE_URL } from '@/constants/path';

const INDIERO_END_POINT = BASE_URL + '/api';

const fetcher = (endpoint: string) => {
  return async <T>(url: string, options?: RequestInit): Promise<T> => {
    try {
      const response = await fetch(endpoint + url, options);

      if (!navigator.onLine) {
        throw new Error(ERROR_MESSAGE.NETWORK_ERROR);
      }

      if (!response.ok) {
        if (response.status >= 500) throw new Error(ERROR_MESSAGE.SERVER_ERROR);
        if (response.status === 404) throw new Error(ERROR_MESSAGE.NOT_FOUND_ERROR);
        if (response.status >= 400) throw new Error(ERROR_MESSAGE.CLIENT_ERROR);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(ERROR_MESSAGE.FETCH_ERROR);
    }
  };
};

export const indieroFetcher = fetcher(INDIERO_END_POINT);
