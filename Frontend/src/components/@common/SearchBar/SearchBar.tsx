import { ChangeEvent, ComponentPropsWithoutRef, FormEvent } from 'react';

import styled from '@emotion/styled';

import { SvgIcon } from '@/components/@common';
import theme from '@/styles/theme';

interface SearchBarProps extends ComponentPropsWithoutRef<'input'> {
  updateQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSearch?: VoidFunction;
}

function SearchBar(searchBarProps: SearchBarProps) {
  const {
    updateQuery,
    onClickSearch,
    placeholder = '원하는 키워드를 입력하세요',
    maxLength = 255,
    ...restProps
  } = searchBarProps;

  const onClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onClickSearch) onClickSearch();
  };

  return (
    <Wrapper onClick={onClick}>
      <Input
        type='search'
        inputMode='search'
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={updateQuery}
        {...restProps}
      />
      <Button aria-label='검색'>
        <SvgIcon variant='search' stroke={theme.textColors.light} />
      </Button>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.form`
  display: flex;

  width: 100%;
  height: 4.6rem;
  padding: 1.1rem 1.6rem;
  border-radius: 20px;

  background-color: ${({ theme }) => theme.backgroundColors.light};
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  margin-right: 0.8rem;

  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.textColors.default};
  line-height: 2rem;

  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.textColors.light};
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;
