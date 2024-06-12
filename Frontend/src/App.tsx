import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import {
  DesktopLayout,
  DialogConfirmContextProvider,
  MobileLayout,
  ToastContextProvider,
} from '@/components/@common';
import { SurveyContextProvider } from '@/pages';

export default function App() {
  return (
    <ToastContextProvider>
      <DialogConfirmContextProvider>
        <SurveyContextProvider>
          <DesktopLayout>
            <Suspense fallback={<div>Loading...</div>}>
              <MobileLayout>
                <Outlet />
              </MobileLayout>
            </Suspense>
          </DesktopLayout>
        </SurveyContextProvider>
      </DialogConfirmContextProvider>
    </ToastContextProvider>
  );
}
