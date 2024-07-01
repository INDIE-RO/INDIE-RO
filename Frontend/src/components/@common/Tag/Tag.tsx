import { PropsWithChildren } from 'react';

import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';

import theme, { ColorKeys, TextColorKeys } from '@/styles/theme';

type TagSize = 'sm' | 'md' | 'lg';

interface TagProps extends PropsWithChildren {
  size: TagSize;
  color: TextColorKeys;
  backgroundColor: ColorKeys;
}

function Tag(tagProps: Partial<TagProps>) {
  const { children, ...restProps } = tagProps;
  return <Wrapper {...restProps}>{children}</Wrapper>;
}

export default Tag;

type TagSizeStyles = Record<TagSize, SerializedStyles>;

const tagSizeStyles: TagSizeStyles = {
  sm: css`
    height: 2rem;
    padding: 0 0.9rem;
    font-size: ${theme.fontSizes.xxxs};
  `,
  md: css`
    height: 2.4rem;
    padding: 0 1.1rem;
    font-size: ${theme.fontSizes.xs};
  `,
  lg: css`
    height: 3.3rem;
    padding: 0 1.3rem;
    font-size: ${theme.fontSizes.sm};
  `,
};

const Wrapper = styled.div<Partial<TagProps>>`
  display: flex;
  align-items: center;
  width: fit-content;
  font-weight: ${theme.fontWeights.semiBold};
  color: ${({ theme, color }) => theme.textColors[color ?? 'white']};
  background: ${({ theme, backgroundColor }) => theme.colors[backgroundColor ?? 'gray6']};
  border-radius: 20px;
  ${({ size }) => tagSizeStyles[size ?? 'md']}
`;
