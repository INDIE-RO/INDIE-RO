import { Outlet } from 'react-router-dom';

import { DesktopLayout, DialogConfirmContextProvider, MobileLayout } from '@/components/@common';

export default function App() {
  return (
    <DialogConfirmContextProvider>
      <DesktopLayout>
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      </DesktopLayout>
    </DialogConfirmContextProvider>
  );
}
