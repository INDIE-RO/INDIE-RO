import { SvgIconVariant } from '@/components/@common/Svg/SvgIcon';
import { PATH } from '@/constants/path';

export interface NavigationMenu {
  variant: SvgIconVariant;
  name: '홈' | '모든정보' | '맞춤정보' | '설문수정';
  path: (typeof PATH)[keyof typeof PATH];
}
