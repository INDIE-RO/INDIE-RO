import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { PATH } from '@/constants/path';
import {
  CustomInfoPage,
  Homepage,
  IntroPage,
  LoadingPage,
  NotFoundPage,
  PolicyDetailPage,
  PolicyListPage,
  PolicySearchPage,
  SurveyPage,
} from '@/pages';

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
        path: PATH.CUSTOM_INFO,
        element: <CustomInfoPage />,
      },
      {
        path: PATH.POLICY_LIST,
        element: <PolicyListPage />,
      },
      {
        path: PATH.POLICY_DETAIL,
        element: <PolicyDetailPage />,
      },
      {
        path: PATH.POLICY_SEARCH,
        element: <PolicySearchPage />,
      },
      {
        path: PATH.EXCEPTION,
        element: <NotFoundPage />,
      },
      {
        path: PATH.LOADING,
        element: <LoadingPage />,
      },
    ],

    errorElement: <div>error page</div>,
  },
]);
