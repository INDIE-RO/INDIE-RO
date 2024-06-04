import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';

import SvgIcon from '../Svg/SvgIcon';

function NavigableHeader() {
  const { goBack, goHome } = useEasyNavigate();

  return (
    <Container>
      <Link to='#' onClick={goBack}>
        <SvgIcon height={18} variant='arrowLeft' stroke='none' fill={theme.colors.white} />
      </Link>
      <Link to='#' onClick={goHome}>
        <SvgIcon variant='home' />
      </Link>
    </Container>
  );
}

export default NavigableHeader;

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4.8rem;
  max-width: 43rem;
  padding: 1.2rem 2.2rem;
  background: ${theme.backgroundColors.deep};
`;