import { NavLink } from 'react-router-dom';

import styled from '@emotion/styled';

import { SvgIcon } from '@/components/@common';
import { NAVIGATION_MENU } from '@/constants/path';
import theme from '@/styles/theme';

function NavigationBar() {
  return (
    <Container>
      <List>
        {NAVIGATION_MENU.map(({ variant, name, path }) => (
          <Item key={variant}>
            <Link to={path}>
              {({ isActive }) => (
                <>
                  <SvgIcon
                    variant={variant}
                    stroke={isActive ? theme.colors.primary : theme.colors.white}
                  />
                  <LinkName isActive={isActive}>{name}</LinkName>
                </>
              )}
            </Link>
          </Item>
        ))}
      </List>
    </Container>
  );
}

export default NavigationBar;

const Container = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 7.3rem;
  max-width: 43rem;
  background: ${theme.backgroundColors.deep};
`;

const List = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  border-top: 1px solid ${theme.dividerColors.bar};
`;

const Item = styled.li`
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 6rem;
`;

const Link = styled(NavLink)`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  align-items: center;
`;

const LinkName = styled.span<{ isActive: boolean }>`
  font-size: ${theme.fontSizes.xxs};
  color: ${({ isActive }) => (isActive ? theme.colors.primary : theme.colors.white)};
`;
