import { FormEvent, useEffect, useState } from 'react';

import { useFilterMetaQuery } from '@/components/Policy/PolicyFilterBottomSheet/PolicyFilterList/PolicyFilterList.query';
import {
  KEYWORD_FOR_FILTER,
  KeywordForFilter,
} from '@/components/Policy/PolicyList/PolicyList.api';
import { useEasyNavigate, useValidQueryParams } from '@/hooks/@common';
import { generateQueryString, parseQueryParams } from '@/utils/route';

export const ALL_REGION_ID = 0;
const INITIAL_FILTERS = {
  categoryId: 1,
  openingStatusId: 2,
  ageId: 1,
  regionIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
};

export const usePolicyFilterBottomSheet = () => {
  const { ageMeta, regionMeta, openingStatusMeta } = useFilterMetaQuery();
  const { replaceQueryParams } = useEasyNavigate();
  const [selectedFilters, setSelectedFilters] = useState(INITIAL_FILTERS);

  const resetFilters = () => {
    setSelectedFilters(INITIAL_FILTERS);
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

    replaceQueryParams(generateQueryString(normalizedFilterList), { exclude: ['sortBy'] });
  };

  const queryParams = useValidQueryParams<KeywordForFilter>(KEYWORD_FOR_FILTER);

  useEffect(() => {
    // URL 쿼리 파라미터로부터 필터 상태 동기화
    const parsedQueryParams = parseQueryParams<KeywordForFilter>(queryParams);

    setSelectedFilters(prev => {
      const { categoryId, openingStatusId, ageId, regionIds } = parsedQueryParams;
      const validRegionIds = regionIds && Array.isArray(regionIds);
      const newRegionIds = validRegionIds ? regionIds : regionIds ? [regionIds] : null;

      return {
        ...prev,
        categoryId: (categoryId as number) ?? INITIAL_FILTERS.categoryId,
        openingStatusId: (openingStatusId as number) ?? INITIAL_FILTERS.openingStatusId,
        ageId: (ageId as number) ?? INITIAL_FILTERS.ageId,
        regionIds: (newRegionIds as number[]) ?? INITIAL_FILTERS.regionIds,
      };
    });
  }, [Object.values(queryParams).join('')]);

  return {
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
  };
};
