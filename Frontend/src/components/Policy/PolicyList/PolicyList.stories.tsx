import { Suspense } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { usePoliciesQuery } from '@/components/Policy/PolicyList/PolicyList.query';

import PolicyList from './PolicyList';

const meta = {
  title: 'Policy/PolicyList',
  component: PolicyList,
  decorators: [
    Story => (
      <Suspense fallback={<PolicyList.Skeleton />}>
        <Story />
      </Suspense>
    ),
  ],
} satisfies Meta<typeof PolicyList>;

export default meta;
type Story = StoryObj<typeof PolicyList>;

export const Basic: Story = {
  args: {},
  render: () => {
    const { policies } = usePoliciesQuery();

    return <PolicyList policies={policies} />;
  },
};

export const NoResult: Story = {
  args: {
    policies: [],
  },
};
