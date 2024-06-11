import { SvgIconVariant } from '@/components/@common/Svg/SvgIcon';
import { PATH } from '@/constants/path';

export interface NavigationMenu {
  variant: SvgIconVariant;
  name: '홈' | '모든정보' | '맞춤정보' | '설문수정';
  path: (typeof PATH)[keyof typeof PATH];
}

export type CategoryVariant = 'job' | 'housing' | 'education' | 'welfare';
export type CategoryVariantKo = '일자리' | '주거' | '교육' | '복지';

export type RegionVariantKo =
  | '서울'
  | '경기'
  | '대구'
  | '인천'
  | '광주'
  | '대전'
  | '울산'
  | '부산'
  | '강원'
  | '충북'
  | '충남'
  | '전북'
  | '전남'
  | '경북'
  | '경남'
  | '제주'
  | '세종';

export type AgeVariantKo = '19세 이하' | '20 ~ 24세' | '25 ~ 29세' | '30 ~ 34세' | '35세 이상';

export interface CategoryMeta {
  id: number;
  name: CategoryVariantKo;
}

export interface RegionMeta {
  id: number;
  name: RegionVariantKo;
}

export interface AgeMeta {
  id: number;
  name: AgeVariantKo;
}
