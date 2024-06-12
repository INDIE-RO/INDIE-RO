import styled from '@emotion/styled';

import { SvgIcon } from '@/components/@common';
import PolicyItem from '@/components/Policy/PolicyItem/PolicyItem';
import theme from '@/styles/theme';
import { Policy } from '@/types/common';

interface PolicyListProps {
  policies: Policy[];
}
function PolicyList({ policies }: PolicyListProps) {
  const hasResult = Boolean(policies.length > 0);

  return (
    <Container>
      {hasResult ? (
        policies.map(policy => (
          <li key={policy.id}>
            <PolicyItem policyInfo={policy} />
          </li>
        ))
      ) : (
        <FlexBox>
          <SvgIcon variant='noResult' width={300} height={300} />
          <p>앗! 정책 목록이 없어요.</p>
        </FlexBox>
      )}
    </Container>
  );
}

const Skeleton = () => (
  <Container>
    {Array(6)
      .fill('')
      .map((_, i) => (
        <PolicyItem.Skeleton key={i} />
      ))}
  </Container>
);

PolicyList.Skeleton = Skeleton;

export default PolicyList;

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.textColors.white};
`;
