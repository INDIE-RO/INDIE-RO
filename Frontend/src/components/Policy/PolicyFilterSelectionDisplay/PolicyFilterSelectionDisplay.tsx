import styled from '@emotion/styled';

import { ChipButton } from '@/components/@common';
import { KeywordForFilter } from '@/components/Policy/PolicyList/PolicyList.api';

import { usePolicyFilterSelectionDisplay } from './PolicyFilterSelectionDisplay.hook';

function PolicyFilterSelectionDisplay() {
  const { filterQueryParams, removeFilter } = usePolicyFilterSelectionDisplay();

  return (
    <Wrapper>
      {Object.entries(filterQueryParams).map(([keyword, values]) =>
        values?.split(',').map(value => (
          <li key={value} onClick={() => removeFilter(keyword as KeywordForFilter, value)}>
            <ChipButton type='button' variant='tag' aria-label={`${value}필터 선택 해제`}>
              {value}
            </ChipButton>
          </li>
        )),
      )}
    </Wrapper>
  );
}

export default PolicyFilterSelectionDisplay;

const Wrapper = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;

  overflow-x: auto;
`;
