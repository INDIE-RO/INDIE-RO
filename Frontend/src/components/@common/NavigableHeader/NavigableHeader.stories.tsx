import type { Meta, StoryObj } from '@storybook/react';

import NavigableHeader from './NavigableHeader';

const meta: Meta<typeof NavigableHeader> = {
  title: '@common/NavigableHeader',
  component: NavigableHeader,
};

export default meta;
type Story = StoryObj<typeof NavigableHeader>;

export const Default: Story = {};
