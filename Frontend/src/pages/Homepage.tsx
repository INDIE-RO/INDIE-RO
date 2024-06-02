import { css } from '@emotion/react';

import theme from '@/styles/theme';

function Homepage() {
  return <section css={Container}>Homepage</section>;
}

export default Homepage;

const Container = css`
  height: 100%;
  background-color: ${theme.backgroundColors.deep};
`;
