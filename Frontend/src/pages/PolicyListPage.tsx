import { Suspense } from 'react';

import styled from '@emotion/styled';

import { BasicLayout, Dropdown, TabMenu } from '@/components/@common';
import { TOTAL_POLICY_TAB_MENUS } from '@/components/@common/TabMenu/constants';
import { Tab, TabVariant } from '@/components/@common/TabMenu/type';
import useTabMenu from '@/components/@common/TabMenu/useTabMenu';
import { PolicyFilterBottomSheet, PolicyList, PolicyListContainer } from '@/components/Policy';
import { usePolicySort } from '@/components/Policy/PolicyList/PolicyList.hook';
import { useSortMetaQuery } from '@/components/Policy/PolicyList/PolicyList.query';
import { CATEGORY_TYPE, TAB_ID_BY_VARIANT } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';
import { generateQueryString } from '@/utils/route';

function PolicyListPage() {
  const { navigate } = useEasyNavigate();
  const { selectedTabMenu, handleTabMenuClick } = useTabMenu(CATEGORY_TYPE.JOB);

  const { sortMeta } = useSortMetaQuery();
  const { changeSortBy } = usePolicySort();

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
          <Dropdown metaData={sortMeta} onClickOption={changeSortBy} />
        </FilterContainer>
        <Suspense fallback={<PolicyList.Skeleton />}>
          <PolicyListContainer />
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
  justify-content: space-between;

  margin: 1.2rem 0;
`;
