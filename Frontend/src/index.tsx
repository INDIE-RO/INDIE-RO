import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import { RouterProvider } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { router } from '@/router/router';

import { SvgSprite } from './components/@common';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

const gaId = process.env.GOOGLE_ANALYTICS_ID;
if (gaId) {
  try {
    ReactGA.initialize(gaId);
  } catch (e) {
    console.warn('GA 초기화 실패:', e);
  }
}

const enableMocking = async () => {
  const { worker } = await import('./mocks/browser');

  return worker.start({
    serviceWorker: {
      url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
      options: {
        scope: `${process.env.PUBLIC_URL}/`,
      },
    },
  });
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      throwOnError: true,
    },
  },
  queryCache: new QueryCache({
    onError: error => {
      alert(error.message);
    },
  }),
});

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <SvgSprite />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
