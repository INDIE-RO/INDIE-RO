import styled from '@emotion/styled';

import { Loading } from '@/components/@common';

interface LoadingPageProps {
  isSurvey?: boolean;
}

function LoadingPage({ isSurvey = false }: LoadingPageProps) {
  return (
    <Container>
      <Loading isSurvey={isSurvey} />
    </Container>
  );
}

export default LoadingPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  text-align: center;
`;
