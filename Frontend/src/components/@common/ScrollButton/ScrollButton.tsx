import { RefObject } from 'react';

import styled from '@emotion/styled';

import { SvgIcon } from '@/components/@common';
import theme from '@/styles/theme';

import useScroll from './useScroll';

interface ScrollButtonProps {
  targetRef: RefObject<HTMLElement>;
}

function ScrollButton({ targetRef }: ScrollButtonProps) {
  const { scrollToTop } = useScroll();

  const handleScroll = () => {
    if (targetRef) {
      scrollToTop(targetRef);
    }
  };

  return (
    <Container>
      <Wrapper type='button' onClick={handleScroll}>
        <SvgIcon variant='arrowUp' width={24} height={24} fill={theme.colors.black} />
      </Wrapper>
    </Container>
  );
}

export default ScrollButton;

const Container = styled.div`
  position: fixed;
  bottom: 9rem;
  display: flex;
  right: 2rem;

  @media screen and (min-width: 768px) {
    left: calc(55% + 380px);
  }
`;

const Wrapper = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.white};
  border-radius: 50%;
`;
