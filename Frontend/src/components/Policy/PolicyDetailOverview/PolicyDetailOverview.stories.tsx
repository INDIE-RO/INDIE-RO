import { Meta, StoryObj } from '@storybook/react';

import PolicyDetailOverview from './PolicyDetailOverview';

const meta = {
  title: 'Policy/PolicyDetailOverview',
  component: PolicyDetailOverview,
} satisfies Meta<typeof PolicyDetailOverview>;

export default meta;
type Story = StoryObj<typeof PolicyDetailOverview>;

export const Basic: Story = {
  args: {
    policyInfo: {
      id: 1,
      title: '[행정안전부] 청년을 위한 취업 역량 개발지원',
      period: '2024-04-20 ~ 2024-05-20',
      tags: [
        {
          id: 1,
          type: '분야',
          name: '일자리',
        },
        {
          id: 2,
          type: '지역',
          name: '서울',
        },
        {
          id: 3,
          type: '모집현황',
          name: '모집중',
        },
        {
          id: 4,
          type: '디데이',
          name: 'D-23',
        },
      ],
    },
  },
};
