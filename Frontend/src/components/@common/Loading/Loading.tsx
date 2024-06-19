import styled from '@emotion/styled';

import Clover1 from '@/assets/clover1.svg';
import Clover2 from '@/assets/clover2.svg';

interface LoadingProps {
  isSurvey?: boolean;
}

function Loading({ isSurvey = false }: LoadingProps) {
  return (
    <>
      <Container>
        <AnimatedClover1 />
        <AnimatedClover2 />
      </Container>
      <div style={{ height: '20px' }} />
      <h1>{isSurvey ? '맞춤정책을 찾고 있어요' : '로딩 중입니다.'}</h1>
    </>
  );
}

export default Loading;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const rollAnimation = `
  @keyframes roll {
    0% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(30vw) rotate(720deg);
    }
  }
`;

const AnimatedClover1 = styled(Clover1)`
  position: absolute;
  top: 20px;
  left: 0;
  width: 50px;
  height: 50px;
  animation: roll 3s linear infinite;

  ${rollAnimation}
`;

const AnimatedClover2 = styled(Clover2)`
  position: absolute;
  top: 60px;
  left: 0;
  width: 50px;
  height: 50px;
  animation: roll 5s linear infinite 0.3s;

  ${rollAnimation}
`;
