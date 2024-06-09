import { ComponentPropsWithoutRef } from 'react';

import Chip, { ChipProps } from '@/components/@common/Chip/Chip';

interface ChipButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'color'>,
    Partial<ChipProps> {}

function ChipButton(chipButtonProps: ChipButtonProps) {
  const { variant, size, color, backgroundColor, width, height, children, disabled, ...restProps } =
    chipButtonProps;

  return (
    <Chip
      as='button'
      variant={variant}
      size={size}
      color={color}
      backgroundColor={backgroundColor}
      disabled={disabled}
      width={width}
      height={height}
      {...restProps}
    >
      {children}
    </Chip>
  );
}

export default ChipButton;
