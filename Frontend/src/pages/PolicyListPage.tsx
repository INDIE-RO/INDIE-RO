import { Suspense } from 'react';

import styled from '@emotion/styled';

import { BasicLayout, TabMenu } from '@/components/@common';
import { TOTAL_POLICY_TAB_MENUS } from '@/components/@common/TabMenu/constants';
import { TabVariant } from '@/components/@common/TabMenu/type';
import useTabMenu from '@/components/@common/TabMenu/useTabMenu';
import { PolicyFilterBottomSheet, PolicyList } from '@/components/Policy';
import { CATEGORY_TYPE, TAB_ID_BY_VARIANT } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';
import { generateQueryString } from '@/utils/route';

function PolicyListPage() {
  const { navigate } = useEasyNavigate();
  const { selectedTabMenu, handleTabMenuClick } = useTabMenu(CATEGORY_TYPE.JOB);

  const changeTab = (selectedMenu: TabVariant) => {
    handleTabMenuClick(selectedMenu);
    navigate(
      `${PATH.POLICY_LIST}${generateQueryString({ categoryId: TAB_ID_BY_VARIANT[selectedMenu] })}`,
    );
  };

  return (
    <BasicLayout>
      <Wrapper>
        <TabMenu
          tabMenus={TOTAL_POLICY_TAB_MENUS}
          selectedTabMenu={selectedTabMenu}
          handleTabMenuSelect={changeTab}
        />
        <FilterContainer>
          <PolicyFilterBottomSheet categoryId={TAB_ID_BY_VARIANT[selectedTabMenu]} />
          {/* <PolicyFilterSelectionDisplay /> */}
        </FilterContainer>
        <Suspense fallback={<PolicyList.Skeleton />}>
          <PolicyList />
        </Suspense>
      </Wrapper>
    </BasicLayout>
  );
}

export default PolicyListPage;

const Wrapper = styled.div`
  padding: 2rem;
  background-color: ${theme.backgroundColors.deep};
`;

const FilterContainer = styled.div`
  display: flex;

  margin: 1.2rem 0;
`;
