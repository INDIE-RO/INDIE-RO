import { Outlet } from 'react-router-dom';

import {
  DefaultLayout,
  DesktopLayout,
  DialogConfirmContextProvider,
  MobileLayout,
  ToastContextProvider,
} from '@/components/@common';

interface AppProps {
  hasHeader?: boolean;
}

export default function App({ hasHeader = false }: AppProps) {
  return (
    <ToastContextProvider>
      <DialogConfirmContextProvider>
        <DesktopLayout>
          <MobileLayout>
            {hasHeader ? (
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
