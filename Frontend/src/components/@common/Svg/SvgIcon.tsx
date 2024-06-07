import { CSSProperties, ComponentPropsWithoutRef } from 'react';

import theme from '@/styles/theme';

export const SVG_ICON_VARIANTS = [
  'home',
  'allInfo',
  'user',
  'modify',
  'arrowLeft',
  'arrowUp',
  'check',
  'close',
] as const;
export type SvgIconVariant = (typeof SVG_ICON_VARIANTS)[number];

interface SvgIconProps extends ComponentPropsWithoutRef<'svg'> {
  variant: SvgIconVariant;
  width?: number;
  height?: number;
  fill?: CSSProperties['fill'];
  stroke?: CSSProperties['stroke'];
}

function SvgIcon(svgIconProps: SvgIconProps) {
  const {
    variant,
    width = 20,
    height = 20,
    fill = 'none',
    stroke = theme.colors.white,
    ...props
  } = svgIconProps;

  return (
    <svg width={width} height={height} fill={fill} stroke={stroke} {...props}>
      <use href={`#${variant}`} />
    </svg>
  );
}

export default SvgIcon;
