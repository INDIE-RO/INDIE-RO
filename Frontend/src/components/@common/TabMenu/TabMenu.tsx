import { MouseEventHandler } from 'react';

import styled from '@emotion/styled';

import { CATEGORY_TYPE } from '@/constants/common';
import { CategoryVariant } from '@/types/common';

import { Tab } from './type';

const TAB_MENUS: Tab<CategoryVariant>[] = [
  { value: CATEGORY_TYPE.JOB, label: '일자리' },
  { value: CATEGORY_TYPE.HOUSING, label: '주거' },
  { value: CATEGORY_TYPE.EDUCATION, label: '교육' },
  { value: CATEGORY_TYPE.WELFARE, label: '복지/문화' },
];

interface TabMenuProps {
  selectedTabMenu: CategoryVariant;
  handleTabMenuSelect: (selectedMenu: CategoryVariant) => void;
}

function TabMenu({ selectedTabMenu, handleTabMenuSelect }: TabMenuProps) {
  const handleTabMenuClick: MouseEventHandler<HTMLButtonElement> = event => {
    handleTabMenuSelect(event.currentTarget.value as CategoryVariant);
  };

  return (
    <Container>
      {TAB_MENUS.map(({ value, label }) => {
        const isSelected = selectedTabMenu === value;
        return (
          <List key={value} isSelected={isSelected}>
            <Button
              isSelected={isSelected}
              type='button'
              value={value}
              onClick={handleTabMenuClick}
            >
              {label}
            </Button>
          </List>
        );
      })}
    </Container>
  );
}

export default TabMenu;

const Container = styled.ul`
  display: flex;
  gap: 12px;
  background: ${({ theme }) => theme.backgroundColors.deep};
`;

const List = styled.li<{ isSelected: boolean }>`
  flex-grow: 1;
  width: 20%;
  height: 4rem;
  text-align: center;
  border-bottom: ${({ isSelected, theme }) =>
    isSelected ? `2px solid ${theme.colors.primary}` : 'none'};
`;

const Button = styled.button<{ isSelected: boolean }>`
  line-height: 40px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.textColors.white)};
`;
