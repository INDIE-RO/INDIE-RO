import { CATEGORY_TYPE } from '@/constants/common';

import { Tab, TabVariant } from './type';

export const DETAIL_POLICY_TAB_TYPE = {
  DESCRIPTION: 'description',
  QUALIFICATION: 'qualification',
  OTHER_INFO: 'otherInfo',
} as const;

export const TOTAL_POLICY_TAB_MENUS: Tab<TabVariant>[] = [
  { value: CATEGORY_TYPE.JOB, label: '일자리' },
  { value: CATEGORY_TYPE.HOUSING, label: '주거' },
  { value: CATEGORY_TYPE.EDUCATION, label: '교육' },
  { value: CATEGORY_TYPE.WELFARE, label: '복지/문화' },
];

export const DETAIL_POLICY_TAB_MENUS: Tab<TabVariant>[] = [
  { value: DETAIL_POLICY_TAB_TYPE.DESCRIPTION, label: '상세내용' },
  { value: DETAIL_POLICY_TAB_TYPE.QUALIFICATION, label: '신청자격' },
  { value: DETAIL_POLICY_TAB_TYPE.OTHER_INFO, label: '기타사항' },
];
