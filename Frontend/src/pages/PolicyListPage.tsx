import { Suspense } from 'react';

import styled from '@emotion/styled';

import { BasicLayout } from '@/components/@common';
import { PolicyFilterBottomSheet, PolicyList } from '@/components/Policy';
import theme from '@/styles/theme';

function PolicyListPage() {
  return (
    <BasicLayout>
      <Wrapper>
        <FilterContainer>
          <PolicyFilterBottomSheet />
        </FilterContainer>
        <Suspense fallback={<PolicyList.Skeleton />}>
          <PolicyList />
        </Suspense>
      </Wrapper>
    </BasicLayout>
  );
}

export default PolicyListPage;

const Wrapper = styled.div`
  padding: 2rem;
  background-color: ${theme.backgroundColors.deep};
`;

const FilterContainer = styled.div`
  margin-bottom: 1.2rem;
`;
