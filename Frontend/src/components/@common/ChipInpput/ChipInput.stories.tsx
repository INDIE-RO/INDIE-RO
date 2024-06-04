import { Meta, StoryObj } from '@storybook/react';

import theme from '@/styles/theme';

import ChipInput from './ChipInput';

const meta = {
  title: '@common/ChipInput',
  component: ChipInput,
  argTypes: {
    variant: { control: 'select', options: ['standard', 'rounded', 'outline'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
  args: {
    children: 'ChipInput',
    variant: 'rounded',
    size: 'md',
    color: theme.textColors.default,
    backgroundColor: theme.colors.primary,
    disabled: false,
    checked: true,
  },
} satisfies Meta<typeof ChipInput>;

export default meta;
type Story = StoryObj<typeof ChipInput>;

export const Checked: Story = {
  args: {},
};

export const Unchecked: Story = {
  args: {
    checked: false,
  },
};
