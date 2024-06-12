import { Outlet } from 'react-router-dom';

import {
  DefaultLayout,
  DesktopLayout,
  DialogConfirmContextProvider,
  MobileLayout,
  ToastContextProvider,
} from '@/components/@common';
import { SurveyContextProvider } from '@/pages';

interface AppProps {
  hasHeader?: boolean;
}

export default function App({ hasHeader = false }: AppProps) {
  return (
    <ToastContextProvider>
      <DialogConfirmContextProvider>
        <SurveyContextProvider>
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
        </SurveyContextProvider>
      </DialogConfirmContextProvider>
    </ToastContextProvider>
  );
}
