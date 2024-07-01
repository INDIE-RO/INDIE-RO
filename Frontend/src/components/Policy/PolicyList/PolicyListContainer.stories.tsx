import { Suspense } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import PolicyList from './PolicyList';
import PolicyListContainer from './PolicyListContainer';

const meta = {
  title: 'Policy/PolicyListContainer',
  component: PolicyListContainer,
  decorators: [
    Story => (
      <Suspense fallback={<PolicyList.Skeleton />}>
        <Story />
      </Suspense>
    ),
  ],
} satisfies Meta<typeof PolicyListContainer>;

export default meta;
type Story = StoryObj<typeof PolicyListContainer>;

export const Basic: Story = {
  args: {},
};
