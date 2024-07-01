import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import {
  DesktopLayout,
  DialogConfirmContextProvider,
  ErrorBoundary,
  MobileLayout,
  ToastContextProvider,
} from '@/components/@common';

import { PATH } from './constants/path';
import { ErrorPage, LoadingPage } from './pages';
import { indieroLocalStorage } from './utils/localStorage';

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasSurvey = indieroLocalStorage.getSurvey();

    if (location.pathname === PATH.INTRO && hasSurvey) {
      navigate(PATH.HOME, { replace: true });
    }
  }, []);

  return (
    <ToastContextProvider>
      <DialogConfirmContextProvider>
        <DesktopLayout>
          <ErrorBoundary fallback={ErrorPage}>
            <Suspense fallback={<LoadingPage />}>
              <MobileLayout>
                <Outlet />
              </MobileLayout>
            </Suspense>
          </ErrorBoundary>
        </DesktopLayout>
      </DialogConfirmContextProvider>
    </ToastContextProvider>
  );
}
