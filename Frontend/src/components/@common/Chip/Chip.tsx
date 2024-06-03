import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import theme from '@/styles/theme';

export interface ChipProps extends PropsWithChildren {
  design: 'standard' | 'outline' | 'rounded';
  size: 'sm' | 'md' | 'lg';
  color: string;
  backgroundColor: string;
  disabled: boolean;
}

function Chip(chipProps: Partial<ChipProps>) {
  const { children, ...restProps } = chipProps;
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

export default Chip;

const Wrapper = styled.div<Partial<ChipProps>>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ size }) => {
    if (size === 'sm') return '16.3rem';
    if (size === 'lg') return '33.5rem';

    return '27.7rem';
  }};

  height: 5.4rem;

  ${({ design, disabled }) => {
    if (design === 'outline' && disabled) return `border: 2px solid ${theme.colors.gray4}`;
    if (design === 'outline' && !disabled) return `border: 2px solid ${theme.colors.primary}`;
  }};

  border-radius: ${({ design }) => (design === 'rounded' ? '20px' : '12px')};

  background-color: ${({ design, disabled, backgroundColor }) => {
    if (design === 'outline') return 'transparent';
    if (disabled) return theme.colors.gray3;
    if (backgroundColor) return backgroundColor;

    return theme.colors.primary;
  }};

  color: ${({ design, disabled, color }) => {
    if (disabled) return theme.colors.gray4;
    if (color) return color;
    if (design === 'outline') return theme.colors.primary;

    return theme.textColors.default;
  }};

  font-weight: ${theme.fontWeights.bold};
  font-size: ${({ size }) => {
    if (size === 'sm') return theme.fontSizes.md;

    return theme.fontSizes.lg;
  }};
`;
