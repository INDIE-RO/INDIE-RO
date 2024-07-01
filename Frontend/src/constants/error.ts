export const ERROR_STATUS = {
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  FETCH_ERROR: 'FETCH_ERROR',
  LOCAL_STORAGE_GET_ITEM_ERROR: 'LOCAL_STORAGE_GET_ITEM_ERROR',
  LOCAL_STORAGE_SET_ITEM_ERROR: 'LOCAL_STORAGE_SET_ITEM_ERROR',
  CLIENT_ERROR: 'CLIENT_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;

const RETRY_MESSAGE = '잠시 후 다시 시도해주세요.' as const;

export const ERROR_MESSAGE: Record<keyof typeof ERROR_STATUS, string> = {
  UNEXPECTED_ERROR: `예상치 못한 문제가 발생했습니다.\n${RETRY_MESSAGE}`,
  FETCH_ERROR: `데이터를 불러오는 도중 문제가 생겼습니다.\n${RETRY_MESSAGE}`,
  LOCAL_STORAGE_GET_ITEM_ERROR: '로컬 스토리지에 해당 아이템이 없습니다.',
  LOCAL_STORAGE_SET_ITEM_ERROR:
    '로컬 스토리지에 아이템을 저장할 수 없습니다. 로컬 스토리지를 활성화하거나 용량을 확인해주세요.',
  CLIENT_ERROR: `유효하지 않은 요청입니다.\n${RETRY_MESSAGE}`,
  NOT_FOUND_ERROR: '요청하신 페이지를 찾을 수 없습니다.',
  SERVER_ERROR: `서버에 문제가 생겼습니다.\n만약 동일한 문제가 반복될 경우 indiero2024@gmail.com으로 연락바랍니다.`,
  NETWORK_ERROR: '네트워크 오프라인이 감지되었습니다',
} as const;
