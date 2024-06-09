import { CATEGORY_TYPE } from '@/constants/common';
import { CategoryVariant, DetailPolicyTabVariant } from '@/types/common';

import { Tab } from './type';

export const TOTAL_POLICY_TAB_MENUS: Tab<CategoryVariant>[] = [
  { value: CATEGORY_TYPE.JOB, label: '일자리' },
  { value: CATEGORY_TYPE.HOUSING, label: '주거' },
  { value: CATEGORY_TYPE.EDUCATION, label: '교육' },
  { value: CATEGORY_TYPE.WELFARE, label: '복지/문화' },
];

export const DETAIL_POLICY_TAB_MENUS: Tab<DetailPolicyTabVariant>[] = [
  { value: 'description', label: '상세내용' },
  { value: 'qualification', label: '신청자격' },
  { value: 'otherInfo', label: '기타사항' },
];
