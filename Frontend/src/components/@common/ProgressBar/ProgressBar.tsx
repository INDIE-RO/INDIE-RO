import styled from '@emotion/styled';

import theme from '@/styles/theme';

const TOTAL_STEP = 3;

interface ProgressBarProps {
  step: number;
}

function ProgressBar({ step }: ProgressBarProps) {
  const progress = (step / TOTAL_STEP) * 100;

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
