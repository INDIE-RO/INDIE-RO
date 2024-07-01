import { ReactNode, useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

interface CarouselProps {
  carouselList: ReactNode[];
  duration?: number;
}

function Carousel({ carouselList, duration = 3000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const extendedCarouselList = [...carouselList, carouselList[0]];

  const showNextSlide = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (currentIndex === carouselList.length) {
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
    }
  }, [currentIndex, carouselList.length]);

  useEffect(() => {
    const timer = setInterval(showNextSlide, duration);

    return () => {
      clearInterval(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [carouselList.length]);

  return (
    <Container>
      <Wrapper
        style={{
          transform: `translateX(-${(currentIndex % (carouselList.length + 1)) * 100}%)`,
          transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
        }}
      >
        {extendedCarouselList.map((item, index) => (
          <Item key={index}>{item}</Item>
        ))}
      </Wrapper>
    </Container>
  );
}

export default Carousel;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const Wrapper = styled.ul`
  display: flex;
`;

const Item = styled.li`
  min-width: 100%;
`;
