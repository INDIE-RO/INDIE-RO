import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import { ChipButton, NavigableHeader, TabMenu } from '@/components/@common';
import {
  DETAIL_POLICY_TAB_MENUS,
  DETAIL_POLICY_TAB_TYPE,
} from '@/components/@common/TabMenu/constants';
import useTabMenu from '@/components/@common/TabMenu/useTabMenu';
import { PolicyDetailContent, PolicyDetailOverview } from '@/components/Policy';
import theme from '@/styles/theme';

import { POLICY_DETAIL_TITLES } from './PolicyDetail.constant';
import { usePolicyDetailQuery } from './PolicyDetail.query';

function PolicyDetailPage() {
  const { id } = useParams();
  const { policyDetail } = usePolicyDetailQuery(Number(id));
  const { selectedTabMenu, handleTabMenuClick } = useTabMenu(DETAIL_POLICY_TAB_TYPE.DESCRIPTION);

  const policyInfo = {
    id: policyDetail?.id,
    title: policyDetail?.title,
    period: policyDetail?.period,
    tags: policyDetail?.tags,
  };

  const policyContent = [
    {
      id: DETAIL_POLICY_TAB_TYPE.DESCRIPTION,
      title: POLICY_DETAIL_TITLES.DESCRIPTION_TITLES,
      contents: policyDetail.description,
    },
    {
      id: DETAIL_POLICY_TAB_TYPE.QUALIFICATION,
      title: POLICY_DETAIL_TITLES.QUALIFICATION_TITLES,
      contents: policyDetail.qualification,
    },
    {
      id: DETAIL_POLICY_TAB_TYPE.OTHER_INFO,
      title: POLICY_DETAIL_TITLES.OTHER_INFO_TITLES,
      contents: policyDetail.otherInfo,
    },
  ];

  return (
    <Container>
      <NavigableHeader />
      <div style={{ height: '72px' }} />
      <Wrapper>
        <PolicyDetailOverview policyInfo={policyInfo} />
      </Wrapper>
      <div style={{ height: '20px' }} />
      <Divider />

      <TabMenu
        tabMenus={DETAIL_POLICY_TAB_MENUS}
        selectedTabMenu={selectedTabMenu}
        handleTabMenuSelect={handleTabMenuClick}
      />
      <div style={{ height: '40px' }} />

      <Wrapper>
        {policyContent.map(
          menu =>
            selectedTabMenu === menu.id && (
              <PolicyDetailContent key={menu.id} titles={menu.title} contents={menu.contents} />
            ),
        )}
      </Wrapper>
      <div style={{ height: '60px' }} />

      <ButtonWrapper>
        <LinkButton
          size='lg'
          width='100%'
          disabled={policyDetail.url === '-'}
          onClick={() => window.open(policyDetail.url)}
        >
          {policyDetail.url === '-' ? '링크 정보가 없어요 🥲' : '살펴보러가기'}
        </LinkButton>
      </ButtonWrapper>
    </Container>
  );
}
export default PolicyDetailPage;

const Container = styled.section`
  overflow-y: auto;
`;

const Wrapper = styled.div`
  padding: 0 20px;
`;

const Divider = styled.hr`
  width: 100%;
  border: 2px solid ${theme.colors.gray6};
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 100%;
  height: 80px;
  padding: 0 20px;

  background: ${theme.backgroundColors.deep};

  @media screen and (min-width: 768px) {
    max-width: 430px;
  }
`;

const LinkButton = styled(ChipButton)`
  bottom: 16px;
`;
