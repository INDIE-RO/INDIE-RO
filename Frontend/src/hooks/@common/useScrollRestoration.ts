import { useEffect, useRef } from 'react';
import { useNavigationType } from 'react-router-dom';

import useThrottle from '@/hooks/@common/useThrottle';

const NAVIGATION_TYPE = {
  POP: 'POP',
  PUSH: 'PUSH',
  RELOAD: 'RELOAD',
} as const;

const useScrollRestoration = () => {
  const navigationType = useNavigationType();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const throttle = useThrottle();

  const SESSION_STORAGE_KEY = {
    SCROLL_Y: 'SCROLL_Y',
  } as const;

  useEffect(() => {
    const handleScrollWithThrottle = throttle(() => {
      if (scrollRef.current) {
        sessionStorage.setItem(
          SESSION_STORAGE_KEY.SCROLL_Y,
          scrollRef.current.scrollTop.toString(),
        );
      }
    });

    scrollRef.current?.addEventListener('scroll', handleScrollWithThrottle);

    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScrollWithThrottle);
    };
  }, [scrollRef]);

  useEffect(() => {
    if (navigationType === NAVIGATION_TYPE.POP) {
      const savedScrollY = sessionStorage.getItem(SESSION_STORAGE_KEY.SCROLL_Y);

      if (savedScrollY && scrollRef.current) {
        scrollRef.current.scrollTop = parseInt(savedScrollY, 10);
      }
    }
  }, [navigationType]);

  return { scrollRef };
};

export default useScrollRestoration;
