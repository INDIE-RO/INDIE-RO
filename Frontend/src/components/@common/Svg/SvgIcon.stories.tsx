import type { Meta, StoryObj } from '@storybook/react';

import SvgIcon, { SVG_ICON_VARIANTS } from './SvgIcon';

const meta: Meta<typeof SvgIcon> = {
  title: 'common/SvgIcon',
  component: SvgIcon,
  argTypes: {
    fill: {
      control: {
        type: 'color',
      },
    },
    stroke: {
      control: {
        type: 'color',
      },
    },
  },
  args: {
    variant: 'allInfo',
    stroke: 'red',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        {SVG_ICON_VARIANTS.map(variant => (
          <SvgIcon key={variant} variant={variant} />
        ))}
      </>
    );
  },
};
