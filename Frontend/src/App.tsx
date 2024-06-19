import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  DesktopLayout,
  DialogConfirmContextProvider,
  MobileLayout,
  ToastContextProvider,
} from '@/components/@common';

import { PATH } from './constants/path';
import { LoadingPage } from './pages';
import { indieroLocalStorage } from './utils/localStorage';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasSurvey = indieroLocalStorage.getSurvey();

    if (hasSurvey) {
      navigate(PATH.HOME, { replace: true });
    }
  }, []);

  return (
    <ToastContextProvider>
      <DialogConfirmContextProvider>
        <DesktopLayout>
          <Suspense fallback={<LoadingPage />}>
            <MobileLayout>
              <Outlet />
            </MobileLayout>
          </Suspense>
        </DesktopLayout>
      </DialogConfirmContextProvider>
    </ToastContextProvider>
  );
}
