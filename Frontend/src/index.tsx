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

ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);

const enableMocking = async () => {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  const { worker } = await import('./mocks/browser');
  return worker.start();
};

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
    onError: error => {
      alert(error.message);
    },
  }),
});

/** @TODO ErrorBoundary 추가 필요 */
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
