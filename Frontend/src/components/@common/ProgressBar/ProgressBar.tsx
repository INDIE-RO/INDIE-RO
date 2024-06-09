import styled from '@emotion/styled';

import theme from '@/styles/theme';

interface ProgressBarProps {
  totalStep: number;
  step: number;
}

function ProgressBar({ totalStep = 3, step }: ProgressBarProps) {
  const progress = (step / totalStep) * 100;

  return (
    <Container>
      <Bar progress={progress} />
    </Container>
  );
}

export default ProgressBar;

const Container = styled.div`
  width: 100%;
  height: 0.5rem;
  background: ${theme.colors.white};
`;

const Bar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background: ${theme.colors.primary};
`;
