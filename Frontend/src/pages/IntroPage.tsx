import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import Clover1 from '@/assets/clover1.svg';
import Clover2 from '@/assets/clover2.svg';
import Logo from '@/assets/logo.svg';
import { ChipButton } from '@/components/@common';
import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';

function IntroPage() {
  const navigate = useNavigate();
  const { goHome } = useEasyNavigate();

  return (
    <Container>
      <div style={{ height: '30px' }} />
      <TitleWrapper>
        <Logo />
        <Title>
          자립준비청년을 위한 <br />
          정책/지원사업 큐레이팅 서비스
        </Title>
      </TitleWrapper>

      <div style={{ height: '70px' }} />

      <IntroBox>
        <CloverWrapper>
          <Clover1 />
          <Clover2 />
        </CloverWrapper>
      </IntroBox>

      <ButtonWrapper>
        <StyledChipButton variant='outline' size='lg' onClick={() => goHome()}>
          건너뛰기
        </StyledChipButton>
        <StyledChipButton size='lg' onClick={() => navigate(PATH.SURVEY)}>
          설문 시작하기
        </StyledChipButton>
      </ButtonWrapper>
    </Container>
  );
}

export default IntroPage;

const Container = styled.section`
  position: relative;
  padding: 0 20px;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semiBold};
`;

const IntroBox = styled.div`
  position: relative;
  width: 100%;
  height: 30rem;
  border-radius: 12px;
  background: ${theme.backgroundColors.normal};
`;

const CloverWrapper = styled.div`
  position: absolute;
  top: -1rem;
  left: 6rem;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 0.5rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  gap: 1.6rem;
`;

const StyledChipButton = styled(ChipButton)`
  flex: 1;
`;
