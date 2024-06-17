import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

import theme from '@/styles/theme';

function MobileLayout({ children }: PropsWithChildren) {
  return <main css={MobileLayoutStyle}>{children}</main>;
}

const MobileLayoutStyle = css`
  width: 100%;
  height: 100%;

  min-width: 375px; // iPhone 13 mini 기준
  min-height: 100vh;

  overflow-y: auto;

  // 자식 요소로 들어올 페이지 기본 스타일링
  > section {
    min-height: 100vh;
    background-color: ${theme.backgroundColors.deep};
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 768px) {
    width: 430px; // iPhone 14 Pro Max 기준
  }
`;

export default MobileLayout;
