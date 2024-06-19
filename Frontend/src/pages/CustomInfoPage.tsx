import { Suspense, useRef } from 'react';

import styled from '@emotion/styled';

import { BasicLayout, ScrollButton } from '@/components/@common';
import { CustomInfo, PolicyList } from '@/components/Policy';

function CustomInfoPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <BasicLayout>
      <Container ref={scrollRef}>
        <div style={{ height: '20px' }} />
        <Suspense fallback={<PolicyList.Skeleton />}>
          <CustomInfo />
        </Suspense>
        <ScrollButton targetRef={scrollRef} />
      </Container>
    </BasicLayout>
  );
}

export default CustomInfoPage;

const Container = styled.section`
  height: 100vh;
  overflow-y: auto;
  padding: 1.6rem 2rem 2rem 2rem;
`;
