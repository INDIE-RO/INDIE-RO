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
export type OpeningStatusVariantKo = '상시모집' | '모집중' | '모집예정' | '마감';
export type SortVariantKo = '마감순' | '조회순';
export interface MetaData<T extends string = string> {
  id: number;
  name: T;
}

export interface OpeningStatusMeta extends MetaData<OpeningStatusVariantKo> {}
export interface CategoryMeta extends MetaData<CategoryVariantKo> {}
export interface RegionMeta extends MetaData<RegionVariantKo> {}
export interface AgeMeta extends MetaData<AgeVariantKo> {}
export interface SortMeta extends MetaData<SortVariantKo> {}

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

export interface WordCloud {
  text: string;
  value: number;
}

export interface RecommendPolicy {
  id: number;
  title: string;
}
