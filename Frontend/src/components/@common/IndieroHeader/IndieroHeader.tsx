import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Logo from '@/assets/logo.svg';
import theme from '@/styles/theme';

function IndieroHeader() {
  return (
    <Container>
      {/* TODO: 네비게이션 바 PR 머지 후 주석 해제 */}
      {/* <Link to={PATH.HOME}> */}
      <Logo />
      {/* </Link> */}
    </Container>
  );
}

export default IndieroHeader;

const Container = styled.header`
  width: 100%;
  height: 4.8rem;
  max-width: 43rem;
  padding: 1.2rem 0 0 2rem;
  background: ${theme.backgroundColors.deep};
`;
