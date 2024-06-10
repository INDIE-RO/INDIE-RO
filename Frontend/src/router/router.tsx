import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { PATH } from '@/constants/path';
import { Homepage, IntroPage, SurveyPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: PATH.INTRO,
        element: <IntroPage />,
      },
      {
        path: PATH.SURVEY,
        element: <SurveyPage />,
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
    element: <App hasHeader />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);
