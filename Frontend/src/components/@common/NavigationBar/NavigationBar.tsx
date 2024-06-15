import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';

import { DialogConfirm, SvgIcon } from '@/components/@common';
import { NAVIGATION_MENU, PATH } from '@/constants/path';
import { useConfirm } from '@/hooks/@common';
import theme from '@/styles/theme';

function NavigationBar() {
  const { confirm } = useConfirm();
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);

  const handleMoveSurvey = async () => {
    setIsActive(true);

    const confirmed = await confirm({ message: '설문을 수정할까요?' });

    if (confirmed) {
      navigate(PATH.SURVEY);
      return;
    }
    setIsActive(false);
  };

  return (
    <Container>
      <List>
        {NAVIGATION_MENU.map(({ variant, name, path }) => (
          <Item key={variant}>
            {variant === 'modify' ? (
              <DialogConfirm onClick={handleMoveSurvey}>
                <SurveyLinkWrapper>
                  <>
                    <SvgIcon
                      variant={variant}
                      stroke={isActive ? theme.colors.primary : theme.colors.white}
                    />
                    <LinkName isActive={isActive}>{name}</LinkName>
                  </>
                </SurveyLinkWrapper>
              </DialogConfirm>
            ) : (
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
            )}
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
  background: ${theme.backgroundColors.deep};

  @media screen and (min-width: 768px) {
    max-width: 430px;
  }
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

const SurveyLinkWrapper = styled.div`
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
