import { Meta, StoryObj } from '@storybook/react';

import PolicyDetailContent from './PolicyDetailContent';

const meta = {
  title: 'Policy/PolicyDetailContent',
  component: PolicyDetailContent,
} satisfies Meta<typeof PolicyDetailContent>;

export default meta;
type Story = StoryObj<typeof PolicyDetailContent>;

export const Basic: Story = {
  args: {
    titles: ['정책소개', '지원내용'],
    contents: [
      {
        info: '자립준비청년이 건전한 재무 습관을 형성하고 경제적으로 자립할 수 있도록 돕는 심층 재무상담 지원사업',
        detail: '□ 주요 상담 내용 ○ 나의 재무 상태 바로보기 ○ 나의 재무 상태 바로보기',
      },
    ],
  },
};
