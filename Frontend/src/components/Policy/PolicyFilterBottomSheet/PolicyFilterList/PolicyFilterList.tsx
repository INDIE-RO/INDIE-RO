import styled from '@emotion/styled';

import { ChipButton } from '@/components/@common';
import theme from '@/styles/theme';
import { MetaData } from '@/types/common';

const checkedStyle = {
  color: theme.textColors.default,
  backgroundColor: theme.colors.primary,
};

const uncheckedStyle = {
  color: theme.textColors.light,
  backgroundColor: theme.colors.white,
};

interface PolicyFilterListProps {
  metaDataList: MetaData[];
  labelText?: string;
  containerRole?: string;
  role?: string;
  checked?: (id: number) => boolean;
  onClick?: (id: number) => void;
}

function PolicyFilterList(policyFilterListProps: PolicyFilterListProps) {
  const {
    metaDataList,
    checked = () => false,
    onClick = () => {},
    labelText,
    containerRole,
    role,
  } = policyFilterListProps;

  return (
    <div>
      <LabelText>{labelText}</LabelText>
      <FilterContainer role={containerRole}>
        {metaDataList.map(({ id, name }) => (
          <li key={id}>
            <ChipButton
              type='button'
              role={role}
              size='sm'
              width='100%'
              fontWeight={theme.fontWeights.semiBold}
              color={checked(id) ? checkedStyle.color : uncheckedStyle.color}
              backgroundColor={
                checked(id) ? checkedStyle.backgroundColor : uncheckedStyle.backgroundColor
              }
              onClick={() => onClick(id)}
            >
              {name}
            </ChipButton>
          </li>
        ))}
      </FilterContainer>
    </div>
  );
}

export default PolicyFilterList;

const LabelText = styled.p`
  margin-bottom: 1.2rem;

  color: ${theme.textColors.white};
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semiBold};
  line-height: 2.4rem;
  text-align: left;
`;

const FilterContainer = styled.ul`
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  justify-items: stretch;
`;
