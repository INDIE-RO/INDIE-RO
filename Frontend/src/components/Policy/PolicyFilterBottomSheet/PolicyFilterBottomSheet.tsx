import { useEffect } from 'react';

import styled from '@emotion/styled';

import { ChipButton, Dialog, SvgIcon } from '@/components/@common';
import PolicyFilterList from '@/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList';
import theme from '@/styles/theme';

import { ALL_REGION_ID, usePolicyFilterBottomSheet } from './PolicyFilterBottomSheet.hook';

interface PolicyFilterBottomSheetProps {
  categoryId: number;
}

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function PolicyFilterBottomSheet({ categoryId }: PolicyFilterBottomSheetProps) {
  const {
    ageMeta,
    regionMeta,
    openingStatusMeta,
    selectedFilters,
    resetFilters,
    getCheckedFunction,
    changeCategoryId,
    changeOpeningStatusId,
    changeAgeId,
    changeRegionIds,
    onSubmit,
  } = usePolicyFilterBottomSheet();

  useEffect(() => {
    changeCategoryId(categoryId);
  }, [categoryId]);

  return (
    <Dialog location={'bottom'}>
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
            {isMobile && <div style={{ minHeight: '16px' }} />}
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
          {isMobile && <div style={{ minHeight: '100px' }} />}
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
  padding: 2.8rem;

  background-color: ${theme.backgroundColors.normal};
  overflow-y: auto;
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
