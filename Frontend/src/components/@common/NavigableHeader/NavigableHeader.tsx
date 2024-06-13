import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import { SvgIcon } from '@/components/@common';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';

interface NavigableHeaderProps {
  onPrev?: () => void;
}

function NavigableHeader({ onPrev }: NavigableHeaderProps) {
  const { goBack, goHome } = useEasyNavigate();

  return (
    <Container>
      <Link to='#' onClick={onPrev ? onPrev : goBack}>
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
  position: fixed;
  z-index: 10000;

  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4.8rem;
  padding: 1.2rem 2.2rem;
  background: ${theme.backgroundColors.deep};

  @media screen and (min-width: 768px) {
    max-width: 430px;
  }
`;
