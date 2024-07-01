import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import ScrollButton from './ScrollButton';

const meta: Meta<typeof ScrollButton> = {
  title: '@common/ScrollButton',
  component: ScrollButton,
};

export default meta;
type Story = StoryObj<typeof ScrollButton>;

export const Default: Story = {
  render: () => {
    const targetRef = useRef<HTMLDivElement>(null);

    return (
      <div style={{ height: '100px' }}>
        <ScrollButton targetRef={targetRef} />
      </div>
    );
  },
};
