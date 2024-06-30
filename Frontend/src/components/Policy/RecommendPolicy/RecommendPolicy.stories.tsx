import type { Meta, StoryObj } from '@storybook/react';

import RecommendPolicy from './RecommendPolicy';

const meta: Meta<typeof RecommendPolicy> = {
  title: '@policy/RecommendPolicy',
  component: RecommendPolicy,
};

export default meta;
type Story = StoryObj<typeof RecommendPolicy>;

export const Default: Story = {};
