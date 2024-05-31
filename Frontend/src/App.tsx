import { Outlet } from 'react-router-dom';

import { DesktopLayout } from '@/components/@common/DesktopLayout';
import { MobileLayout } from '@/components/@common/MobileLayout';

export default function App() {
  return (
    <DesktopLayout>
      <MobileLayout>
        <Outlet />
      </MobileLayout>
    </DesktopLayout>
  );
}
