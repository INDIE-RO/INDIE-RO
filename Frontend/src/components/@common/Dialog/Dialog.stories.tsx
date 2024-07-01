import { Meta, StoryObj } from '@storybook/react';

import theme from '@/styles/theme';

import Dialog from './Dialog';

const meta = {
  title: '@common/Dialog',
  component: Dialog,
  argTypes: {
    location: { control: 'inline-radio', options: ['center', 'bottom'] },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Bottom: Story = {
  args: { location: 'bottom' },
  render: ({ location }) => {
    return (
      <Dialog
        location={location}
        onBackdropClick={() => console.log('Close Modal(default) & Do Something!')}
      >
        <Dialog.Trigger asChild>
          <button
            type='button'
            style={{
              borderRadius: '8px',
              backgroundColor: theme.colors.primary,
              padding: '0.8rem',
              color: theme.textColors.default,
              fontWeight: theme.fontWeights.semiBold,
            }}
          >
            Click Me!
          </button>
        </Dialog.Trigger>
        <Dialog.Content>
          <div
            style={{
              position: 'relative',
              minWidth: '1000px',
              height: '1000px',
              backgroundColor: theme.colors.primary,
            }}
          >
            <Dialog.Close
              aria-label='닫기'
              asChild
              onClick={() => console.log('Close Modal(default) & Do Something!')}
            >
              <button
                type='button'
                style={{ position: 'absolute', right: '0.8rem', top: '0.8rem' }}
              >
                x
              </button>
            </Dialog.Close>
            Contents
          </div>
        </Dialog.Content>
      </Dialog>
    );
  },
};
