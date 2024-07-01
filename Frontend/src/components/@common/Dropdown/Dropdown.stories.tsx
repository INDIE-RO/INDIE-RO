import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import Dropdown from './Dropdown';

const meta = {
  title: '@common/Dropdown',
  component: Dropdown,
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  args: {
    metaData: [
      {
        id: 1,
        name: '마감순',
      },
      {
        id: 2,
        name: '조회순',
      },
    ],
    onClickOption: fn,
  },
};
