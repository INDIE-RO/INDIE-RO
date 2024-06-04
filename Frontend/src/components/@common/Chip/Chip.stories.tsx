import { Meta, StoryObj } from '@storybook/react';

import theme from '@/styles/theme';

import Chip from './Chip';

const meta = {
  title: '@common/Chip',
  component: Chip,
  argTypes: {
    variant: { control: 'select', options: ['standard', 'rounded', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Chip',
    variant: 'standard',
    size: 'md',
    color: theme.textColors.default,
    backgroundColor: theme.colors.primary,
    disabled: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

export const Standard: Story = {
  args: {},
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
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
