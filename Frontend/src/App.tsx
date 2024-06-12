import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import {
  DesktopLayout,
  DialogConfirmContextProvider,
  MobileLayout,
  ToastContextProvider,
} from '@/components/@common';

export default function App() {
  return (
    <ToastContextProvider>
      <DialogConfirmContextProvider>
        <DesktopLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <MobileLayout>
              <Outlet />
            </MobileLayout>
          </Suspense>
        </DesktopLayout>
      </DialogConfirmContextProvider>
    </ToastContextProvider>
  );
}
