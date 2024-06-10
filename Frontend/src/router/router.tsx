import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { PATH } from '@/constants/path';
import Homepage from '@/pages/Homepage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: PATH.SURVEY,
        element: <div>설문조사</div>,
      },
      {
        path: PATH.EXCEPTION,
        element: <div>404 NOT FOUND</div>,
      },
    ],

    errorElement: <div>error page</div>,
  },

  // 레이아웃이 있는 페이지
  {
    path: '/',
    element: <App hasLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);
