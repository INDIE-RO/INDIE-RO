import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import Logo from '@/assets/logo.svg';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';

function IndieroHeader() {
  const { goHome } = useEasyNavigate();

  return (
    <Container>
      <Link to='#' onClick={goHome}>
        <Logo />
      </Link>
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
