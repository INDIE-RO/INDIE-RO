import '@emotion/react';

import type {
  Animations,
  BackgroundColors,
  Colors,
  DividerColors,
  FontSizes,
  FontWeights,
  TextColors,
} from './styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    textColors: TextColors;
    dividerColors: DividerColors;
    backgroundColors: BackgroundColors;

    fontSizes: FontSizes;
    fontWeights: FontWeights;

    animations: Animations;
  }
}
