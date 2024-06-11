import { CSSProperties, PropsWithChildren } from 'react';

import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';

import SvgIcon from '@/components/@common/Svg/SvgIcon';
import theme from '@/styles/theme';

type ChipVariant = 'standard' | 'outline' | 'rounded' | 'tag';
type ChipSize = 'sm' | 'md' | 'lg';

export interface ChipProps extends PropsWithChildren {
  as: keyof JSX.IntrinsicElements;
  variant: ChipVariant;
  size: ChipSize;
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
  disabled: boolean;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
}

function Chip(chipProps: Partial<ChipProps>) {
  const { children, ...restProps } = chipProps;
  return (
    <Wrapper {...restProps}>
      <TextBox>{children}</TextBox>
      {restProps.variant === 'tag' && (
        <>
          {' '}
          <SvgIcon
            variant='close'
            fill={restProps.color ? restProps.color : theme.colors.white}
            stroke='none'
            width={11}
            height={11}
          />
        </>
      )}
    </Wrapper>
  );
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
    height: 3.3rem;
    border-radius: 6px;
    font-size: ${theme.fontSizes.sm};
  `,
  md: css`
    height: 5rem;
    border-radius: 8px;
    font-size: ${theme.fontSizes.md};
  `,
  lg: css`
    height: 5.4rem;
    border-radius: 12px;
    font-size: ${theme.fontSizes.lg};
  `,
};

const chipVariantStyles: ChipVariantStyles = {
  standard: ({ color, backgroundColor, disabled }) =>
    css`
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

  tag: ({ color, backgroundColor }) => css`
    height: 2.4rem;

    padding: 0.6rem 0.8rem;

    border-radius: 16px;
    background-color: ${backgroundColor ? backgroundColor : theme.backgroundColors.normal};

    color: ${color ? color : theme.textColors.white};
    font-weight: ${theme.fontWeights.medium};
    font-size: ${theme.fontSizes.xxs};
    line-height: 11px;
  `,
};

const Wrapper = styled.div<Partial<ChipProps>>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  padding: 1.2rem 1.6rem;

  font-weight: ${theme.fontWeights.bold};
  transition: background-color 0.3s ease, 0.3s;

  ${({ size }) => chipSizeStyles[size ?? 'md']};
  ${({ variant, color, backgroundColor, disabled }) =>
    chipVariantStyles[variant ?? 'standard']({ color, backgroundColor, disabled })};

  ${({ width }) => width && `width: ${width}`};
  ${({ height }) => height && `height: ${height}`};
`;

const TextBox = styled.p`
  width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
