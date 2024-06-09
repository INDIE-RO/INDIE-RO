import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { TOAST_VARIANT, ToastVariant } from './Toast';
import { ToastItem } from './ToastContext';

const TOAST_DISPLAY_DURATION = 4500;
const TOAST_REMOVAL_DELAY = 500;

export const useToastProvider = () => {
  const [toastList, setToastList] = useState<ToastItem[]>([]);
  const currentToastList = useRef<ToastItem[]>([]);

  const newToastId = useRef(0);
  const toastTimers = useRef<Map<number, NodeJS.Timeout>>(new Map<number, NodeJS.Timeout>());

  const generateToastId = (): number => newToastId.current;

  const createToastByVariant = useCallback(
    (variant: ToastVariant) =>
      (content: string): ToastItem => {
        const newToastId = generateToastId();

        appendToast({ variant, content, id: newToastId });

        if (currentToastList.current.length >= 5) {
          currentToastList.current[0].deleted = true; // 가장 오래된 Toast 즉시 제거
          setToastList(currentToastList.current);

          setTimeout(() => {
            removeToast(currentToastList.current[0].id);
          }, TOAST_REMOVAL_DELAY);
        }

        return { id: newToastId, variant, content };
      },
    [],
  );

  const appendToast = (toast: ToastItem) => {
    const toastTimerId = setTimeout(() => {
      removeToast(toast.id);
    }, TOAST_DISPLAY_DURATION);

    toastTimers.current.set(toast.id, toastTimerId);

    currentToastList.current = [...currentToastList.current, toast];
    setToastList(currentToastList.current);

    newToastId.current += 1;
  };

  const removeToast = (toastId: number) => {
    currentToastList.current = currentToastList.current.filter(toast => toast.id !== toastId);
    setToastList(currentToastList.current);

    toastTimers.current.delete(toastId);
  };

  const deleteAllToast = () => {
    currentToastList.current = [];
    setToastList(currentToastList.current);

    toastTimers.current = new Map<number, NodeJS.Timeout>();
  };

  const toast = useMemo(
    () => ({
      info: createToastByVariant(TOAST_VARIANT.INFO),
      success: createToastByVariant(TOAST_VARIANT.SUCCESS),
      warning: createToastByVariant(TOAST_VARIANT.WARNING),
    }),
    [createToastByVariant],
  );

  const location = useLocation();

  useEffect(deleteAllToast, [location.key]); // 페이지 이동 시 Toast 정리

  return { toast, toastList };
};
