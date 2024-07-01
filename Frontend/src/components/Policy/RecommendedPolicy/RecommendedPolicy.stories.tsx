import type { Meta, StoryObj } from '@storybook/react';

import RecommendedPolicy from './RecommendedPolicy';

const meta: Meta<typeof RecommendedPolicy> = {
  title: '@policy/RecommendedPolicy',
  component: RecommendedPolicy,
};

export default meta;
type Story = StoryObj<typeof RecommendedPolicy>;

export const Default: Story = {};
