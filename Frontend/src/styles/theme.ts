const colors = {
  primary: '#E9FF75',
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
  xxs: '0.688rem',
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.5rem',
} as const;

const fontWeights = {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

const theme = {
  colors,
  textColors,
  dividerColors,
  backgroundColors,
  tagColors,
  fontSizes,
  fontWeights,
};

export default theme;