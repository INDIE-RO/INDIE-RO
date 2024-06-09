import { Meta, StoryObj } from '@storybook/react';

import theme from '@/styles/theme';

import ChipButton from './ChipButton';

const meta = {
  title: '@common/ChipButton',
  component: ChipButton,
  argTypes: {
    variant: { control: 'select', options: ['standard', 'outline', 'rounded', 'tag'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    disabled: { control: 'boolean' },
    width: { control: 'number' },
    height: { control: 'number' },
  },
  args: {
    children: 'ChipButton',
    variant: 'standard',
    size: 'md',
    color: theme.textColors.default,
    backgroundColor: theme.colors.primary,
    disabled: false,
  },
} satisfies Meta<typeof ChipButton>;

export default meta;
type Story = StoryObj<typeof ChipButton>;

export const Standard: Story = {
  args: {},
};

export const Tag: Story = {
  args: {
    variant: 'tag',
    color: undefined,
    backgroundColor: undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
