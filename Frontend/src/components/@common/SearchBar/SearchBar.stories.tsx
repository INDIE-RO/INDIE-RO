import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SearchBar from './SearchBar';

const meta = {
  title: '@common/SearchBar',
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Basic: Story = {
  args: {
    updateQuery: fn(),
    onClickSearch: fn(),
  },
};
