import { useEffect, useRef } from 'react';
import { useNavigationType } from 'react-router-dom';

const NAVIGATION_TYPE = {
  POP: 'POP',
  PUSH: 'PUSH',
  RELOAD: 'RELOAD',
} as const;

const useScrollRestoration = () => {
  const navigationType = useNavigationType();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const SESSION_STORAGE_KEY = {
    SCROLL_Y: 'SCROLL_Y',
  } as const;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        sessionStorage.setItem(
          SESSION_STORAGE_KEY.SCROLL_Y,
          scrollRef.current.scrollTop.toString(),
        );
      }
    };

    scrollRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll);
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
