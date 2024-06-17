import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import NoResult from '@/assets/noResult.svg?url';
import PolicyItem from '@/components/Policy/PolicyItem/PolicyItem';
import { PATH } from '@/constants/path';
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
            <Link to={`${PATH.POLICY_LIST}/${policy.id}`}>
              <PolicyItem policyInfo={policy} />
            </Link>
          </li>
        ))
      ) : (
        <FlexBox>
          <Image src={NoResult} />
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

const Image = styled.img`
  width: 30rem;
  height: 30rem;
`;
