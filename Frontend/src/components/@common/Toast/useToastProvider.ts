import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { TOAST_VARIANT, ToastVariant } from './Toast';
import { ToastItem } from './ToastContext';

const TOAST_NUM_LIMIT = 3;
const TOAST_REMOVAL_DELAY = 4500;
const TOAST_REMOVAL_DELAY_SHORT = 500;

export const useToastProvider = () => {
  const [toastList, setToastList] = useState<ToastItem[]>([]);
  const currentToastList = useRef<ToastItem[]>([]);

  const newToastId = useRef(0);
  const generateToastId = (): number => newToastId.current;

  const createToastByVariant = useCallback(
    (variant: ToastVariant) =>
      (content: string): ToastItem => {
        const newToastId = generateToastId();

        appendToast({ variant, content, id: newToastId });

        if (currentToastList.current.length > TOAST_NUM_LIMIT) {
          currentToastList.current[0].deleted = true;
          setToastList(currentToastList.current);

          // 사라지는 애니메이션 동작 후 제거
          setTimeout(() => {
            removeToast(currentToastList.current[0].id);
          }, TOAST_REMOVAL_DELAY_SHORT);
        }

        return { id: newToastId, variant, content };
      },
    [],
  );

  const appendToast = (toast: ToastItem) => {
    setTimeout(() => {
      removeToast(toast.id);
    }, TOAST_REMOVAL_DELAY);

    currentToastList.current = [...currentToastList.current, toast];
    setToastList(currentToastList.current);

    newToastId.current += 1;
  };

  const removeToast = (toastId: number) => {
    currentToastList.current = currentToastList.current.filter(toast => toast.id !== toastId);
    setToastList(currentToastList.current);
  };

  const deleteAllToast = () => {
    currentToastList.current = [];
    setToastList(currentToastList.current);
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
