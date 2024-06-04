import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import { NavigationBar } from '@/components/@common';
import { PATH } from '@/constants/path';
import Homepage from '@/pages/Homepage';

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
      {
        path: PATH.POLICY_LIST,
        element: (
          <div>
            <NavigationBar />
          </div>
        ),
      },
      {
        path: PATH.CUSTOM_INFO,
        element: (
          <div>
            <NavigationBar />
          </div>
        ),
      },
      {
        path: PATH.SURVEY,
        element: (
          <div>
            <NavigationBar />
          </div>
        ),
      },
    ],

    errorElement: <div>error page</div>,
  },
]);
