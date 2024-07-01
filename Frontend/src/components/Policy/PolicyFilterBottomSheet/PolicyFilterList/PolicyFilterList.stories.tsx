import { Meta, StoryObj } from '@storybook/react';

import PolicyFilterList from './PolicyFilterList';

const meta = {
  title: 'Policy/PolicyFilterBottomSheet/PolicyFilterList',
  component: PolicyFilterList,
} satisfies Meta<typeof PolicyFilterList>;

export default meta;
type Story = StoryObj<typeof PolicyFilterList>;

export const Basic: Story = {
  args: {
    metaDataList: [
      {
        id: 1,
        name: '상시모집',
      },
      {
        id: 2,
        name: '모집중',
      },
      {
        id: 3,
        name: '모집예정',
      },
      {
        id: 4,
        name: '마감',
      },
    ],
    labelText: '모집현황',
    containerRole: 'radiogroup',
    role: 'radio',
    checked: () => true,
  },
};
