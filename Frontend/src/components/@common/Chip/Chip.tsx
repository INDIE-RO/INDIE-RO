import { CSSProperties, PropsWithChildren } from 'react';

import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '@/styles/theme';

type ChipVariant = 'standard' | 'outline' | 'rounded';
type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends PropsWithChildren {
  variant: ChipVariant;
  size: ChipSize;
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
  disabled: boolean;
}

function Chip(chipProps: Partial<ChipProps>) {
  const { children, ...restProps } = chipProps;
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

export default Chip;

type ChipSizeStyles = Record<ChipSize, SerializedStyles>;

type ChipVariantStyles = Record<
  ChipVariant,
  (chipVariantStylesProps: ChipVariantStylesProps) => SerializedStyles
>;

type ChipVariantStylesProps = Partial<Pick<ChipProps, 'color' | 'backgroundColor' | 'disabled'>>;

const chipSizeStyles: ChipSizeStyles = {
  sm: css`
    width: 16.3rem;
    font-size: ${theme.fontSizes.md};
  `,
  md: css`
    width: 27.7rem;
    font-size: ${theme.fontSizes.lg};
  `,
  lg: css`
    width: 33.5rem;
    font-size: ${theme.fontSizes.lg};
  `,
};

const chipVariantStyles: ChipVariantStyles = {
  standard: ({ color, backgroundColor, disabled }) =>
    css`
      border-radius: 12px;

      background-color: ${disabled
        ? theme.colors.gray3
        : backgroundColor
        ? backgroundColor
        : theme.colors.primary};

      color: ${disabled ? theme.colors.gray4 : color ? color : theme.textColors.default};
    `,

  outline: ({ color, backgroundColor, disabled }) =>
    css`
      border: 2px solid
        ${disabled ? theme.colors.gray4 : backgroundColor ? backgroundColor : theme.colors.primary};
      border-radius: 12px;
      background-color: transparent;
      color: ${disabled ? theme.colors.gray4 : color ? color : theme.colors.primary};
    `,

  rounded: ({ color, backgroundColor, disabled }) =>
    css`
      border-radius: 20px;

      background-color: ${disabled
        ? theme.colors.gray3
        : backgroundColor
        ? backgroundColor
        : theme.colors.primary};

      color: ${disabled ? theme.colors.gray4 : color ? color : theme.textColors.default};
    `,
};

const Wrapper = styled.div<Partial<ChipProps>>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 5.4rem;
  font-weight: ${theme.fontWeights.bold};
  transition: background-color 0.3s ease, 0.3s;

  ${({ size }) => chipSizeStyles[size ?? 'md']};
  ${({ variant, color, backgroundColor, disabled }) =>
    chipVariantStyles[variant ?? 'standard']({ color, backgroundColor, disabled })};
`;
