import type { Meta, StoryObj } from '@storybook/react';

import IndieroHeader from './IndieroHeader';

const meta: Meta<typeof IndieroHeader> = {
  title: '@common/IndieroHeader',
  component: IndieroHeader,
};

export default meta;
type Story = StoryObj<typeof IndieroHeader>;

export const Default: Story = {};
