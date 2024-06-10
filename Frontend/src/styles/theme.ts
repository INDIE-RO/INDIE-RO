import { keyframes } from '@emotion/react';

const colors = {
  primary: '#E9FF75',
  secondary: '#697335',
  pink: '#FED6FF',
  red: '#FF6B6B',

  white: '#FFFFFF',
  gray: '#F5F5F5',
  gray1: '#F2F2F2',
  gray2: '#DEDEDE',
  gray3: '#A9A9A9',
  gray4: '#5A5A5A',
  gray5: '#4D4D4D',
  gray6: '#44454C',
  gray7: '#404040',
  gray8: '#25242D',
  black: '#000000',
} as const;

const textColors = {
  default: colors.gray7,
  white: colors.gray,
  light: colors.gray3,
  deep: colors.gray5,
} as const;

const dividerColors = {
  bar: colors.gray4,
  stroke: colors.gray2,
} as const;

const backgroundColors = {
  deep: colors.gray8,
  normal: colors.gray6,
  light: colors.gray1,
} as const;

const tagColors = {
  category: colors.pink,
  region: colors.white,
  openingStatus: colors.primary,
  dDay: colors.red,
};

const fontSizes = {
  xxxs: '0.8rem',
  xxs: '1.1rem',
  xs: '1.2rem',
  sm: '1.4rem',
  md: '1.6rem',
  lg: '1.8rem',
  xl: '2.4rem',
} as const;

const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

const animations = {
  toastFadeIn: keyframes`
    from {
      opacity: 0;
      transform: translateY(200%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  `,
  toastFadeOut: keyframes`
    from {
      opacity: 1;
      transform: translateY(-0%);
    }
    to {
      opacity: 0;
      transform: translateY(200%);
      display: none;
    }
  `,
  fadeIn: keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `,
  slideUp: keyframes`
    from {
      transform: translateY(100vh);
    }
    to {
      transform: translateY(calc(100vh - 100%));
    }
  `,
} as const;

const theme = {
  colors,
  textColors,
  dividerColors,
  backgroundColors,
  tagColors,
  fontSizes,
  fontWeights,
  animations,
};

export type Colors = typeof colors;
export type TextColors = typeof textColors;
export type DividerColors = typeof dividerColors;
export type BackgroundColors = typeof backgroundColors;

export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;

export type Animations = typeof animations;

export type ColorKeys = keyof typeof colors;
export type TextColorKeys = keyof typeof textColors;

export type Theme = typeof theme;

export default theme;
