import { Suspense } from 'react';

import styled from '@emotion/styled';

import { BasicLayout, Dropdown, ScrollButton, SearchBar, TabMenu } from '@/components/@common';
import { TOTAL_POLICY_TAB_MENUS } from '@/components/@common/TabMenu/constants';
import { TabVariant } from '@/components/@common/TabMenu/type';
import useTabMenu from '@/components/@common/TabMenu/useTabMenu';
import { PolicyFilterBottomSheet, PolicyList, PolicyListContainer } from '@/components/Policy';
import { usePolicySort } from '@/components/Policy/PolicyList/PolicyList.hook';
import { useSortMetaQuery } from '@/components/Policy/PolicyList/PolicyList.query';
import { CATEGORY_TYPE, TAB_ID_BY_VARIANT } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useEasyNavigate, useScrollRestoration } from '@/hooks/@common';
import { usePolicySearch } from '@/pages/PolicySearchPage/PolicySearch.hook';
import { generateQueryString } from '@/utils/route';

function PolicyListPage() {
  const { navigate } = useEasyNavigate();
  const { scrollRef } = useScrollRestoration();
  const { selectedTabMenu, handleTabMenuClick } = useTabMenu(CATEGORY_TYPE.JOB);

  const { sortMeta } = useSortMetaQuery();
  const { changeSortBy } = usePolicySort();
  const { search, changeSearchQuery } = usePolicySearch();

  const changeTab = (selectedMenu: TabVariant) => {
    handleTabMenuClick(selectedMenu);

    navigate(
      `${PATH.POLICY_LIST}${generateQueryString({ categoryId: TAB_ID_BY_VARIANT[selectedMenu] })}`,
    );
  };

  return (
    <BasicLayout>
      <Container ref={scrollRef}>
        <SearchBar
          updateQuery={changeSearchQuery}
          onClickSearch={search}
          placeholder='필요한 정책을 검색하세요!'
        />
        <div style={{ height: '12px' }} />
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
        <div style={{ height: '10rem' }} />
        <ScrollButton targetRef={scrollRef} />
      </Container>
    </BasicLayout>
  );
}

export default PolicyListPage;

const Container = styled.section`
  height: 100vh;
  padding: 2rem;
  overflow-y: scroll;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 1.2rem 0;
`;
