import { Meta, StoryObj } from '@storybook/react';

import Toast from './Toast';

const meta = {
  title: '@common/Toast',
  component: Toast,
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning'] },
  },
  decorators: [
    Story => (
      <div style={{ width: 'fit-content', height: '6rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    variant: 'info',
    content: 'info!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    content: 'warning!',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    content: 'success!',
  },
};
