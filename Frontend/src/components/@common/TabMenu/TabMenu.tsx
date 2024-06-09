import { MouseEvent } from 'react';

import styled from '@emotion/styled';

import { Tab, TabVariant } from './type';

interface TabMenuProps {
  tabMenus: Tab<TabVariant>[];
  selectedTabMenu: TabVariant;
  handleTabMenuSelect: (selectedMenu: TabVariant) => void;
}

function TabMenu({ tabMenus, selectedTabMenu, handleTabMenuSelect }: TabMenuProps) {
  const handleTabMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    handleTabMenuSelect(event.currentTarget.value as TabVariant);
  };

  return (
    <Container>
      {tabMenus.map(({ value, label }) => {
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
