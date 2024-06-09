import type { Meta, StoryObj } from '@storybook/react';

import TabMenu from './TabMenu';
import { DETAIL_POLICY_TAB_MENUS, TOTAL_POLICY_TAB_MENUS } from './constants';

const meta: Meta<typeof TabMenu> = {
  title: '@common/TabMenu',
  component: TabMenu,
};

export default meta;
type Story = StoryObj<typeof TabMenu>;

export const Default: Story = {
  args: {
    tabMenus: TOTAL_POLICY_TAB_MENUS,
  },
};

export const DetailPolicyTab: Story = {
  args: {
    tabMenus: DETAIL_POLICY_TAB_MENUS,
  },
};
