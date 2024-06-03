import { Meta, StoryObj } from '@storybook/react';

import ChipButton from './ChipButton';

const meta = {
  title: 'INDIERO/@common/ChipButton',
  component: ChipButton,
  args: {
    children: 'ChipButton',
  },
} satisfies Meta<typeof ChipButton>;

export default meta;
type Story = StoryObj<typeof ChipButton>;

export const Basic: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
