import React from 'react';

import type { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

import { handlers } from '../src/mocks/handlers';

initialize({
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: [...handlers],
    },

    decorators: [Story => <Story />, mswDecorator],
  },
};

export default preview;
