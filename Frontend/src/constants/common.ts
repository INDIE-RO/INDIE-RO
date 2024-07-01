import { TabVariant } from '@/components/@common/TabMenu/type';

export const FORM_EXIT_CONFIRMATION_MESSAGE =
  '페이지를 떠나면 현재까지 입력한 정보가 사라질 수 있어요. 뒤로 가시겠어요?';

export const CATEGORY_TYPE = {
  JOB: 'job',
  HOUSING: 'housing',
  EDUCATION: 'education',
  WELFARE: 'welfare',
} as const;

// description~otherInfo는 백엔드서버로부터 메타데이터를 조회하지 않으므로 id가 없으나 임의로 지정함
export const TAB_ID_BY_VARIANT: Record<TabVariant, number> = {
  job: 1,
  housing: 2,
  education: 3,
  welfare: 4,
  description: 5,
  qualification: 6,
  otherInfo: 7,
} as const;

export const TAG_BY_ID: Record<number, string> = {
  1: 'category',
  2: 'region',
  3: 'openingStatus',
  4: 'dDay',
} as const;
