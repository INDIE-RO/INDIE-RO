import { Meta, StoryObj } from '@storybook/react';

import PolicyFilterBottomSheet from './PolicyFilterBottomSheet';

const meta = {
  title: 'Policy/PolicyFilterBottomSheet',
  component: PolicyFilterBottomSheet,
} satisfies Meta<typeof PolicyFilterBottomSheet>;

export default meta;
type Story = StoryObj<typeof PolicyFilterBottomSheet>;

export const Basic: Story = {
  args: {},
};
