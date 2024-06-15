import { Suspense, useState } from 'react';

import styled from '@emotion/styled';

import { BasicLayout, Dropdown } from '@/components/@common';
import TabMenu from '@/components/@common/TabMenu/TabMenu';
import { Tab, TabVariant } from '@/components/@common/TabMenu/type';
import { PolicyFilterBottomSheet, PolicyList, PolicyListContainer } from '@/components/Policy';
import { usePolicySort } from '@/components/Policy/PolicyList/PolicyList.hook';
import { useSortMetaQuery } from '@/components/Policy/PolicyList/PolicyList.query';
import { TAB_ID_BY_VARIANT } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';
import { CategoryVariant } from '@/types/common';
import { generateQueryString } from '@/utils/route';

const tabMenus: Tab<CategoryVariant>[] = [
  { value: 'job', label: '일자리' },
  { value: 'housing', label: '주거' },
  { value: 'education', label: '교육' },
  { value: 'welfare', label: '복지/문화' },
];

function PolicyListPage() {
  const { navigate } = useEasyNavigate();
  const { sortMeta } = useSortMetaQuery();
  const { changeSortBy } = usePolicySort();
  const [selectedTabMenu, setSelectedTabMenu] = useState<TabVariant>(tabMenus[0].value);

  const changeTab = (selectedMenu: TabVariant) => {
    setSelectedTabMenu(selectedMenu);

    navigate(
      `${PATH.POLICY_LIST}${generateQueryString({ categoryId: TAB_ID_BY_VARIANT[selectedMenu] })}`,
    );
  };

  return (
    <BasicLayout>
      <Wrapper>
        <TabMenu
          tabMenus={tabMenus}
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
