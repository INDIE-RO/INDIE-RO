import { Outlet } from 'react-router-dom';

import {
  DefaultLayout,
  DesktopLayout,
  DialogConfirmContextProvider,
  MobileLayout,
  ToastContextProvider,
} from '@/components/@common';

interface AppProps {
  hasLayout?: boolean;
}

export default function App({ hasLayout = false }: AppProps) {
  return (
    <ToastContextProvider>
      <DialogConfirmContextProvider>
        <DesktopLayout>
          <MobileLayout>
            {hasLayout ? (
              <DefaultLayout>
                <Outlet />
              </DefaultLayout>
            ) : (
              <Outlet />
            )}
          </MobileLayout>
        </DesktopLayout>
      </DialogConfirmContextProvider>
    </ToastContextProvider>
  );
}
