import { SvgIconVariant } from '@/components/@common/Svg/SvgIcon';
import { PATH } from '@/constants/path';

export interface NavigationMenu {
  variant: SvgIconVariant;
  name: '홈' | '모든정보' | '맞춤정보' | '설문수정';
  path: (typeof PATH)[keyof typeof PATH];
}

export type CategoryVariant = 'job' | 'housing' | 'education' | 'welfare';
export type CategoryVariantKo = '일자리' | '주거' | '교육' | '복지';

export interface CategoryMeta {
  id: number;
  name: CategoryVariantKo;
}

export interface Policy {
  id: number;
  title: string;
  period: string;
  tags: Tag[];
}

export interface Tag {
  id: number;
  type: '분야' | '지역' | '모집현황' | '디데이';
  name: string;
}
