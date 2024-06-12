export const FORM_EXIT_CONFIRMATION_MESSAGE =
  '페이지를 떠나면 현재까지 입력한 정보가 사라질 수 있어요. 뒤로 가시겠어요?';

export const CATEGORY_TYPE = {
  JOB: 'job',
  HOUSING: 'housing',
  EDUCATION: 'education',
  WELFARE: 'welfare',
} as const;

export const TAG_BY_ID: Record<number, string> = {
  1: 'category',
  2: 'region',
  3: 'openingStatus',
  4: 'dDay',
} as const;
