import { ComponentPropsWithoutRef } from 'react';

import styled from '@emotion/styled';

import Chip, { ChipProps } from '@/components/@common/Chip/Chip';
import SvgIcon from '@/components/@common/Svg/SvgIcon';
import theme from '@/styles/theme';

interface ChipInputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'color' | 'size'>,
    Partial<ChipProps> {}

function ChipInput(chipInputProps: ChipInputProps) {
  const {
    variant = 'rounded',
    size,
    color,
    backgroundColor,
    children,
    ...restProps
  } = chipInputProps;

  return (
    <Chip
      variant={variant}
      size={size}
      color={restProps.checked ? color : theme.textColors.white}
      backgroundColor={restProps.checked ? backgroundColor : theme.colors.gray6}
      disabled={restProps.disabled}
    >
      <InputWrapper {...restProps} />
      <FlexBox>
        <SvgIcon
          variant='check'
          fill={restProps.checked ? theme.colors.secondary : theme.colors.gray3}
          width={18}
          height={14}
        />
        {children}
      </FlexBox>
    </Chip>
  );
}

export default ChipInput;

const InputWrapper = styled.input`
  cursor: pointer;

  position: absolute;
  z-index: 1000;

  width: 100%;
  height: 100%;

  opacity: 0;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 100%;
  padding: 0 2.4rem;

  text-align: left;
  line-height: 24px;

  transition: background-color 0.3s ease;
`;
