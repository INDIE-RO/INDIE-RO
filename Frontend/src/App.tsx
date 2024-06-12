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
          <MobileLayout>
            <Outlet />
          </MobileLayout>
        </DesktopLayout>
      </DialogConfirmContextProvider>
    </ToastContextProvider>
  );
}
