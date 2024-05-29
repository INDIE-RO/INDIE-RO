import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          모바일 사이즈 레이아웃으로 감싸기
          <Outlet />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </QueryClientProvider>
  );
}
