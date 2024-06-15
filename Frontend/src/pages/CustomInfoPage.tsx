import { Suspense } from 'react';

import styled from '@emotion/styled';

import { BasicLayout } from '@/components/@common';
import { CustomInfo, PolicyList } from '@/components/Policy';
import theme from '@/styles/theme';

function CustomInfoPage() {
  return (
    <BasicLayout>
      <Wrapper>
        <Suspense fallback={<PolicyList.Skeleton />}>
          <CustomInfo />
        </Suspense>
      </Wrapper>
    </BasicLayout>
  );
}

export default CustomInfoPage;

const Wrapper = styled.div`
  height: calc(100% - 6.8rem);
  padding: 1.6rem 2rem 2rem 2rem;
  background-color: ${theme.backgroundColors.deep};
`;
