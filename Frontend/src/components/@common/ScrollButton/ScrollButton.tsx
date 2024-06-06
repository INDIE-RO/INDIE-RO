import { RefObject } from 'react';

import styled from '@emotion/styled';

import theme from '@/styles/theme';

import SvgIcon from '../Svg/SvgIcon';
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
    <Wrapper type='button' onClick={handleScroll}>
      <SvgIcon variant='arrowUp' width={24} height={24} fill={theme.colors.black} />
    </Wrapper>
  );
}

export default ScrollButton;

const Wrapper = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.white};
  border-radius: 50%;
`;
