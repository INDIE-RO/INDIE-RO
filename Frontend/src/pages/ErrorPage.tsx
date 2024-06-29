import styled from '@emotion/styled';

import NotFound from '@/assets/notFound.svg?url';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';

function ErrorPage(error?: Error) {
  const { goHome } = useEasyNavigate();

  const refresh = () => {
    goHome();
    window.location.reload();
  };

  return (
    <Container>
      <img src={NotFound} alt='' width={250} height={250} />
      <div style={{ height: '40px' }} />
      <h1>문제가 발생했어요!</h1>
      <div style={{ height: '20px' }} />
      {error?.message && <p>[ERROR]{error.message}</p>}
      <pre>
        {'\n인디로 팀이 해결 중이니 잠시 후 다시 시도해주세요!\n만일 동일한 문제가 계속된다면'}
      </pre>
      <a href='indiero2024@gmail.com'>indiero2024@gmail.com으로 연락해 주세요.</a>
      <div style={{ height: '30px' }} />
      <HomeButton type='button' onClick={refresh}>
        홈으로 돌아가기
      </HomeButton>
    </Container>
  );
}

export default ErrorPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`;

const HomeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  height: 36px;
  padding: 22px 80px;
  border: 1px solid ${theme.colors.white};
  border-radius: 20px;
  white-space: nowrap;
  color: ${theme.textColors.white};
`;
