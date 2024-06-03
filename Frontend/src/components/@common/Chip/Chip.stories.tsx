import { Meta, StoryObj } from '@storybook/react';

import Chip from './Chip';

const meta = {
  title: 'INDIERO/@common/Chip',
  component: Chip,
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
  args: {
    children: 'Chip',
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const Standard: Story = {
  args: {},
};

export const Outline: Story = {
  args: {
    design: 'outline',
  },
};

export const Rounded: Story = {
  args: {
    design: 'rounded',
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
