import type { Meta, StoryObj } from '@storybook/react';

import Carousel from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: '@common/Carousel',
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  args: {
    carouselList: [
      <div style={{ background: 'red' }}>1번 캐러셀입니다</div>,
      <div style={{ background: 'orange' }}>2번 캐러셀입니다</div>,
      <div style={{ background: 'yellow' }}>3번 캐러셀입니다</div>,
    ],
  },
};
