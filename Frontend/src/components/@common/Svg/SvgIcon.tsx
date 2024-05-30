import { CSSProperties, ComponentPropsWithoutRef } from 'react';

export const SVG_ICON_VARIANTS = ['allInfo'] as const;
export type SvgIconVariant = (typeof SVG_ICON_VARIANTS)[number];

interface SvgIconProps extends ComponentPropsWithoutRef<'svg'> {
  variant: SvgIconVariant;
  width?: number;
  height?: number;
  fill?: CSSProperties['fill'];
  stroke?: CSSProperties['stroke'];
}

function SvgIcon(svgIconProps: SvgIconProps) {
  const { variant, width = 20, height = 20, fill = 'red', stroke = 'red', ...props } = svgIconProps;

  return (
    <svg width={width} height={height} fill={fill} stroke={stroke} {...props}>
      <use href={`#${variant}`} />
    </svg>
  );
}

export default SvgIcon;
