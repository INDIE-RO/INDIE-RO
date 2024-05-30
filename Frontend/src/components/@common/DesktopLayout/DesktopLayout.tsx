import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

import indieroBackground from '@/assets/indieroBackground.svg?url';

function DesktopLayout({ children }: PropsWithChildren) {
  return <div css={DesktopLayoutStyle}>{children}</div>;
}

const DesktopLayoutStyle = css`
  width: 100%;

  @media screen and (min-width: 768px) {
    box-sizing: border-box;

    width: 100vw;
    height: 100vh;

    padding-left: 55%;

    background: url(${indieroBackground}) no-repeat center;
    background-size: cover;

    overflow-y: auto;
  }
`;

export default DesktopLayout;
