import { Suspense } from 'react';

import styled from '@emotion/styled';

import { BasicLayout, ScrollButton } from '@/components/@common';
import { CustomInfo, PolicyList } from '@/components/Policy';
import { useScrollRestoration } from '@/hooks/@common';
import theme from '@/styles/theme';

function CustomInfoPage() {
  const { scrollRef } = useScrollRestoration();

  return (
    <BasicLayout>
      <Container ref={scrollRef}>
        <div style={{ height: '20px' }} />
        <Suspense fallback={<PolicyList.Skeleton />}>
          <CustomInfo />
        </Suspense>
        <div style={{ height: '10rem' }} />
        <ScrollButton targetRef={scrollRef} />
      </Container>
    </BasicLayout>
  );
}

export default CustomInfoPage;

const Container = styled.div`
  height: calc(100vh - 6rem);
  overflow-y: auto;
  padding: 1.6rem 2rem 9rem 2rem;
  background: ${theme.backgroundColors.deep};
`;
