import { ComponentPropsWithoutRef } from 'react';

import Chip, { ChipProps } from '@/components/@common/Chip/Chip';

interface ChipButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'color'>,
    Partial<ChipProps> {}

function ChipButton(chipButtonProps: ChipButtonProps) {
  const { variant, size, color, backgroundColor, children, ...restProps } = chipButtonProps;

  return (
    <button {...restProps}>
      <Chip
        variant={variant}
        size={size}
        color={color}
        backgroundColor={backgroundColor}
        disabled={restProps.disabled}
      >
        {children}
      </Chip>
    </button>
  );
}

export default ChipButton;
