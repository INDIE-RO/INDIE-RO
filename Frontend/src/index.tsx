import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { router } from '@/router/router';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('@/mocks/browser');
  worker.start();
}

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

/** @TODO ErrorBoundary 추가 필요 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>,
);
