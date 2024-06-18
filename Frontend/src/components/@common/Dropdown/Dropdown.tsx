import { MouseEvent, useState } from 'react';

import styled from '@emotion/styled';

import { SvgIcon } from '@/components/@common';
import theme from '@/styles/theme';
import { MetaData } from '@/types/common';

interface DropdownProps {
  metaData: MetaData[];
  onClickOption: <T extends number>(optionValue: T) => void;
}
function Dropdown(dropdownProps: DropdownProps) {
  const { metaData, onClickOption } = dropdownProps;
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(metaData.at(0)?.name ?? '');

  const toggleOpen = () => setOpen(prev => !prev);

  const changeOption = (event: MouseEvent<HTMLLIElement>) => {
    onClickOption(event.currentTarget.value);
    setSelectedOption(event.currentTarget.textContent ?? '');
    setOpen(false);
  };

  return (
    <Container>
      <Button
        id='dropdownButton'
        onClick={toggleOpen}
        aria-haspopup='true'
        aria-expanded={open}
        aria-controls='dropdown'
      >
        {selectedOption}
        {open ? <SvgIcon variant='up' stroke='none' /> : <SvgIcon variant='down' stroke='none' />}
      </Button>
      {open && (
        <Ul role='menu' id='dropdown' aria-labelledby='dropdownButton'>
          {metaData.map(({ id, name }) => (
            <Li
              key={id}
              role='menuitem'
              value={id}
              onClick={changeOption}
              selected={selectedOption === name}
            >
              {name}
            </Li>
          ))}
        </Ul>
      )}
    </Container>
  );
}

export default Dropdown;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;
  background-color: transparent;

  color: ${theme.textColors.white};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.medium};
  white-space: nowrap;
`;

const Ul = styled.ul`
  position: absolute;
  top: 100%;

  display: flex;
  flex-direction: column;

  width: 100%;
  background-color: ${theme.backgroundColors.normal};
  border-radius: 10px;

  color: ${theme.textColors.light};
  font-size: ${theme.fontSizes.sm};
  font-weight: ${theme.fontWeights.bold};

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Li = styled.li<{ selected: boolean }>`
  cursor: pointer;

  margin: 0.8rem 1.6rem;

  ${({ selected }) => selected && `color: ${theme.textColors.white}`};
`;
