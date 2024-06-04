import { Outlet } from 'react-router-dom';

import { DesktopLayout, MobileLayout } from '@/components/@common';

export default function App() {
  return (
    <DesktopLayout>
      <MobileLayout>
        <Outlet />
      </MobileLayout>
    </DesktopLayout>
  );
}
