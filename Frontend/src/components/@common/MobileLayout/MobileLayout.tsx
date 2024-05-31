import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

function MobileLayout({ children }: PropsWithChildren) {
  return <div css={MobileLayoutStyle}>{children}</div>;
}

const MobileLayoutStyle = css`
  width: 100%;
  height: 100%;

  min-width: 375px; // iPhone 13 mini 기준
  min-height: 100vh;

  overflow-y: auto;

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 768px) {
    width: 430px; // iPhone 14 Pro Max 기준
  }
`;

export default MobileLayout;
