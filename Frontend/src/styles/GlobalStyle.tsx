import { Global, css } from '@emotion/react';

import fonts from './font';
import theme from './theme';

const baseStyle = css`
  ${fonts}

  * {
    margin: 0;
    padding: 0;
  }

  *,
  ::after,
  :before {
    box-sizing: border-box;
  }

  :root {
    -webkit-tap-highlight-color: transparent; /* 모바일에서 클릭 시 검은색 영역 삭제 */
    -webkit-text-size-adjust: 100%; /* 모바일에서도 원래의 폰트 크기대로 출력 */
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    -moz-tab-size: 4;
    tab-size: 4;

    /* 띄어쓰기 안한 글자가 빠져나가는 현상 방지 */
    overflow-wrap: break-word;
    word-break: break-word;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: ${theme.backgroundColors.deep};
    color: ${theme.textColors.white};
    font-size: ${theme.fontSizes.md};
  }

  html,
  body {
    min-height: 100%;
  }

  a {
    color: ${theme.textColors.white};
    text-decoration: none;
    outline: none;
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  input {
    background-color: transparent;
    border: 0;
  }

  button {
    color: initial;
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  select {
    appearance: none;
    -webkit-appearance: none; /* 사파리, 크롬 하위버전용 */
    -moz-appearance: none; /* 사파리, 크롬 하위버전용 */
    border-radius: 0;
  }

  img,
  picture,
  video,
  canvas {
    /* 이미지나 비디오가 inline으로 되어 있어 4px씩 여백이 생기는 문제 해결을 위함 */
    display: block;
    /* 빠져나가지 않도록함 */
    max-width: 100%;
  }

  img {
    pointer-events: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const GlobalStyle = () => <Global styles={baseStyle} />;

export default GlobalStyle;
