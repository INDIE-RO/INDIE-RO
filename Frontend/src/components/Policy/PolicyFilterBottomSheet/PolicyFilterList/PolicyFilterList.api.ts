import { indieroClient } from '@/apis/ClientApi';
import { ERROR_MESSAGE } from '@/constants/error';
import { API_PATH } from '@/constants/path';
import { AgeMeta, OpeningStatusMeta, RegionMeta } from '@/types/common';

export interface GetFilterMetaResponse {
  openingStatuses: OpeningStatusMeta[];
  ages: AgeMeta[];
  regions: RegionMeta[];
}

export const getFilterMeta = async () => {
  try {
    const data = await indieroClient.get<GetFilterMetaResponse>(API_PATH.FILTER_META, {});

    if (!data) throw new Error('필터목록을 불러오는 데 실패했습니다.');

    return data;
  } catch (error) {
    if (error instanceof Error) throw error;
    else throw new Error(ERROR_MESSAGE.FETCH_ERROR);
  }
};
