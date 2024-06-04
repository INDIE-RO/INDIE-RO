import React from 'react';

import { ThemeProvider } from '@emotion/react';
import type { Preview } from '@storybook/react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { withRouter } from 'storybook-addon-remix-react-router';

import { handlers } from '../src/mocks/handlers';
import GlobalStyle from '../src/styles/GlobalStyle';
import theme from '../src/styles/theme';

initialize({
  serviceWorker: {
    url: '/mockServiceWorker.js',
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60 * 5 /** @TODO 논의 후 값 변경 필요 */,
      gcTime: 1000 * 60 * 5,
      throwOnError: true,
    },
  },
  queryCache: new QueryCache({
    onError: () => {
      alert('[Error] Something went wrong!');
    },
  }),
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
  },
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </QueryClientProvider>
    ),
    withRouter,
  ],
  loaders: [mswLoader], // Add the MSW loader to all stories
};

export default preview;
