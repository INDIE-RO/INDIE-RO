import type { Meta, StoryObj } from '@storybook/react';

import TabMenu from './TabMenu';

const meta: Meta<typeof TabMenu> = {
  title: '@common/TabMenu',
  component: TabMenu,
};

export default meta;
type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {};