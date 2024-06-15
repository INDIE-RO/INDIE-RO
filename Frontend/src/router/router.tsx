import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { PATH } from '@/constants/path';
import { Homepage, IntroPage, SurveyPage } from '@/pages';
import PolicyListPage from '@/pages/PolicyListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <IntroPage />,
      },
      {
        path: PATH.HOME,
        element: <Homepage />,
      },
      {
        path: PATH.SURVEY,
        element: <SurveyPage />,
      },
      {
        path: PATH.POLICY_LIST,
        element: <PolicyListPage />,
      },
      {
        path: PATH.EXCEPTION,
        element: <div>404 NOT FOUND</div>,
      },
    ],

    errorElement: <div>error page</div>,
  },
]);
