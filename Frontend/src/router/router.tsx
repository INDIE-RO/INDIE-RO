import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import Homepage from '@/pages/Homepage';

export const PATH = {
  HOME: '/',
  POLICY_LIST: '/policies',
  POLICY_DETAIL: '/policies/:id',
  BACK: -1,
  EXCEPTION: '/*',
} as const;

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: PATH.EXCEPTION,
        element: <div>404 NOT FOUND</div>,
      },
    ],

    errorElement: <div>error page</div>,
  },
]);
