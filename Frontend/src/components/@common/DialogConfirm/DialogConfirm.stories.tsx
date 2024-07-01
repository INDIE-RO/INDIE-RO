import { Meta, StoryObj } from '@storybook/react';

import { useConfirm } from '@/hooks/@common';
import theme from '@/styles/theme';

import DialogConfirm from './DialogConfirm';

const meta = {
  title: '@common/DialogConfirm',
  component: DialogConfirm,
} satisfies Meta<typeof DialogConfirm>;

export default meta;
type Story = StoryObj<typeof DialogConfirm>;

export const Basic: Story = {
  args: {
    children: (
      <button
        type='button'
        style={{
          borderRadius: '8px',
          backgroundColor: theme.colors.primary,
          padding: '0.8rem',
          color: theme.textColors.default,
          fontWeight: theme.fontWeights.semiBold,
        }}
      >
        Click Me!
      </button>
    ),
  },
  render: ({ children }) => {
    const { confirm } = useConfirm();

    const someHandler = async () => {
      const confirmed = await confirm({ message: '설문 정보를 수정하시겠습니까?' });

      if (confirmed) console.log('설문조사 페이지로 이동합니다.');
      else console.log('이 페이지를 나가지 않습니다.');
    };

    return <DialogConfirm onClick={someHandler}>{children}</DialogConfirm>;
  },
};
