import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { PATH } from '@/constants/path';

const CustomInfoPage = lazy(
  () => import(/* webpackChunkName: "CustomInfoPage" */ '@/pages/CustomInfoPage'),
);
const Homepage = lazy(() => import(/* webpackChunkName: "Homepage" */ '@/pages/Homepage'));
const IntroPage = lazy(() => import(/* webpackChunkName: "IntroPage" */ '@/pages/IntroPage'));
const LoadingPage = lazy(() => import(/* webpackChunkName: "LoadingPage" */ '@/pages/LoadingPage'));
const NotFoundPage = lazy(
  () => import(/* webpackChunkName: "NotFoundPage" */ '@/pages/NotFoundPage'),
);
const PolicyDetailPage = lazy(
  () =>
    import(/* webpackChunkName: "PolicyDetailPage" */ '@/pages/PolicyDetailPage/PolicyDetailPage'),
);
const PolicyListPage = lazy(
  () => import(/* webpackChunkName: "PolicyListPage" */ '@/pages/PolicyListPage'),
);
const PolicySearchPage = lazy(
  () =>
    import(/* webpackChunkName: "PolicySearchPage" */ '@/pages/PolicySearchPage/PolicySearchPage'),
);
const SurveyPage = lazy(
  () => import(/* webpackChunkName: "SurveyPage" */ '@/pages/SurveyPage/SurveyPage'),
);

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
