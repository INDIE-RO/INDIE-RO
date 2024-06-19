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
        <div style={{ height: '8px' }} />
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
        안녕하세요, 인디:로(Indie:路)입니다! <br />
        <br />
        <IntroTitle>설문 시작하기</IntroTitle>
        나에게 맞는 맞춤 정책을 확인해 보세요! <br />
        <SubTextBox>
          📝 설문문항 : 관심분야, 지역, 나이 <br />⏰ 소요시간: 𝟯초 <br />
        </SubTextBox>
        <br />
        <IntroTitle>건너뛰기</IntroTitle>
        인기 검색 키워드가 궁금하다면, <br />
        인디로가 알려줄게요! <br />
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
  height: 38rem;
  padding: 40px 20px;
  border-radius: 12px;
  background: ${theme.backgroundColors.normal};
  font-size: ${theme.fontSizes.lg};
  text-align: center;
  line-height: 1.6;
`;

const IntroTitle = styled.h2`
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.lg};
  margin-bottom: 0.3rem;
`;

const SubTextBox = styled.p`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  text-align: left;
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
  position: fixed;
  bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  gap: 1.6rem;

  @media screen and (min-width: 768px) {
    max-width: 390px;
  }
`;

const StyledChipButton = styled(ChipButton)`
  flex: 1;
`;
