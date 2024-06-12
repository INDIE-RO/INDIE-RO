import styled from '@emotion/styled';

import PolicyItem from '@/components/Policy/PolicyItem/PolicyItem';
import { usePoliciesQuery } from '@/components/Policy/PolicyList/PolicyList.query';

function PolicyList() {
  const { policies } = usePoliciesQuery();
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
        <p>없어없어</p>
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
