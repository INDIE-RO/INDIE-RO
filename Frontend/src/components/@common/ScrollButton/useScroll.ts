import type { RefObject } from 'react';

const useScroll = () => {
  const scrollToTop = <T extends HTMLElement>(ref: RefObject<T>) => {
    if (ref.current) {
      ref.current.scrollTo(0, 0);
    }
  };

  return { scrollToTop };
};

export default useScroll;
