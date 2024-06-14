import { FormEvent, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { ChipButton, Dialog, SvgIcon } from '@/components/@common';
import PolicyFilterList from '@/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList';
import { useFilterMetaQuery } from '@/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList.query';
import { PATH } from '@/constants/path';
import { useEasyNavigate } from '@/hooks/@common';
import theme from '@/styles/theme';
import { generateQueryString } from '@/utils/route';

const ALL_REGION_ID = 0;
const INITIAL_FILTERS = (categoryId: number) => ({
  categoryId,
  openingStatusId: 1,
  ageId: 1,
  regionIds: [1],
});

interface PolicyFilterBottomSheetProps {
  categoryId: number;
}

function PolicyFilterBottomSheet({ categoryId }: PolicyFilterBottomSheetProps) {
  const { ageMeta, regionMeta, openingStatusMeta } = useFilterMetaQuery();
  const { navigate } = useEasyNavigate();
  const [selectedFilters, setSelectedFilters] = useState(INITIAL_FILTERS(categoryId));

  const resetFilters = () => {
    setSelectedFilters(INITIAL_FILTERS(categoryId));
  };

  const getCheckedFunction = (selectedFilterIds: number[]) => (id: number) => {
    return selectedFilterIds.includes(id);
  };

  const changeCategoryId = (selectedCategoryId: number) => {
    setSelectedFilters(prev => ({ ...prev, categoryId: selectedCategoryId }));
  };

  const changeOpeningStatusId = (selectedOpeningStatusId: number) => {
    setSelectedFilters(prev => ({ ...prev, openingStatusId: selectedOpeningStatusId }));
  };

  const changeAgeId = (selectedAgeId: number) => {
    setSelectedFilters(prev => ({ ...prev, ageId: selectedAgeId }));
  };

  const changeRegionIds = (selectedRegionId: number) => {
    setSelectedFilters(prev => {
      const regionIdSet = new Set(prev.regionIds);
      const hasAllRegion = regionIdSet.has(ALL_REGION_ID);
      const alreadyHas = regionIdSet.has(selectedRegionId);

      // 이미 선택된 칩인 경우 선택해제
      if (alreadyHas) {
        // 전체 선택 칩을 선택한 경우 모든 칩 선택 해제
        if (selectedRegionId === ALL_REGION_ID) return { ...prev, regionIds: [] };

        // 전체 선택 칩을 제외한 다른 칩을 선택한 경우 해당 칩 선택 해제
        regionIdSet.delete(selectedRegionId);

        // 전체선택 칩이 선택된 상태에서 다른 칩을 선택해제하는 경우 전체선택 칩도 선택해제
        if (hasAllRegion) regionIdSet.delete(ALL_REGION_ID);

        return {
          ...prev,
          regionIds: [...regionIdSet],
        };
      }

      // 전체선택 칩을 선택한 경우 모든 칩 선택
      if (selectedRegionId === ALL_REGION_ID) {
        return {
          ...prev,
          regionIds: [ALL_REGION_ID, ...regionMeta.map(region => region.id)],
        };
      }

      // 전체선택 칩을 제외한 다른 칩을 선택한 경우 해당 칩 선택
      return { ...prev, regionIds: [...prev.regionIds, selectedRegionId] };
    });
  };

  const normalizeRegionIds = (rawRegionIds: number[]) => {
    if (rawRegionIds.length === 0 || rawRegionIds.includes(ALL_REGION_ID)) {
      return regionMeta.map(region => region.id);
    }

    return rawRegionIds;
  };

  const onSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const normalizedFilterList = {
      ...selectedFilters,
      regionIds: normalizeRegionIds(selectedFilters.regionIds),
    };

    navigate(`${PATH.POLICY_LIST}${generateQueryString(normalizedFilterList)}`);
  };

  useEffect(() => {
    changeCategoryId(categoryId);
  }, [categoryId]);

  return (
    <Dialog location={'bottom'} onBackdropClick={resetFilters}>
      <Dialog.Trigger asChild>
        <ChipButton
          type='button'
          variant='outline'
          size='sm'
          borderRadius='16px'
          border='1px solid'
          fontSize={theme.fontSizes.xxs}
          fontWeight={theme.fontWeights.medium}
        >
          <FlexBox>
            <SvgIcon variant='filter' stroke='none' fill={theme.colors.primary} />
            필터
          </FlexBox>
        </ChipButton>
      </Dialog.Trigger>
      <Dialog.Content>
        <ContentWrapper onSubmit={onSubmit}>
          <Dialog.Close aria-label='닫기' asChild onClick={resetFilters}>
            <CloseButton type='button' aria-label='닫기'>
              <SvgIcon variant='close' stroke='none' fill={theme.colors.white} />
            </CloseButton>
          </Dialog.Close>
          <FilterListContainer>
            <PolicyFilterList
              metaDataList={openingStatusMeta}
              labelText='모집현황'
              containerRole='radiogroup'
              role='radio'
              checked={getCheckedFunction([selectedFilters.openingStatusId])}
              onClick={changeOpeningStatusId}
            />
            <PolicyFilterList
              metaDataList={ageMeta}
              labelText='나이'
              containerRole='radiogroup'
              role='radio'
              checked={getCheckedFunction([selectedFilters.ageId])}
              onClick={changeAgeId}
            />
            <PolicyFilterList
              metaDataList={[{ id: ALL_REGION_ID, name: '전체' }, ...regionMeta]}
              labelText='지역'
              role='checkbox'
              checked={getCheckedFunction(selectedFilters.regionIds)}
              onClick={changeRegionIds}
            />
          </FilterListContainer>
          <Dialog.Close asChild onClick={() => onSubmit}>
            <ChipButton width='100%'>필터적용</ChipButton>
          </Dialog.Close>
        </ContentWrapper>
      </Dialog.Content>
    </Dialog>
  );
}

export default PolicyFilterBottomSheet;

const FilterListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  width: 100%;
  height: 100%;
  margin-bottom: 2.4rem;
`;

const ContentWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 2.4rem 2rem;

  background-color: ${theme.backgroundColors.normal};
`;

const CloseButton = styled.button`
  position: absolute;
  right: 2rem;
  top: 2rem;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
