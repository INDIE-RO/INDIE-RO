import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: '@common/ProgressBar',
  component: ProgressBar,
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    step: 1,
  },
};

export const SecondStep: Story = {
  args: {
    step: 2,
  },
};

export const ThirdStep: Story = {
  args: {
    step: 3,
  },
};
