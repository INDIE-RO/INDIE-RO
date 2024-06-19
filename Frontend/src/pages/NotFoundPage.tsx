import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import { theme } from '@fun-eat/design-system';

import NotFound from '@/assets/NotFound.svg?url';
import { PATH } from '@/constants/path';

function NotFoundPage() {
  return (
    <Container>
      <img src={NotFound} alt='' width={250} height={250} />
      <div style={{ height: '40px' }} />
      <h1>페이지를 찾을 수 없어요</h1>
      <div style={{ height: '20px' }} />
      <p>
        찾으려는 페이지의 주소가 <br />
        존재하지 않거나, 사용할 수 없어요.
      </p>
      <div style={{ height: '30px' }} />
      <LinkWrapper>
        <Link to={PATH.HOME}>홈으로 돌아가기</Link>
      </LinkWrapper>
    </Container>
  );
}

export default NotFoundPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 124px;
  height: 36px;
  padding: 22px 80px;
  border: 1px solid ${theme.colors.primary};
  border-radius: 20px;
  white-space: nowrap;
`;
