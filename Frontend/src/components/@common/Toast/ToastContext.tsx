import { PropsWithChildren, createContext, useMemo } from 'react';
import { createPortal } from 'react-dom';

import styled from '@emotion/styled';

import { useContextInScope } from '@/hooks/@common';

import Toast, { TOAST_VARIANT, ToastProps, ToastVariant } from './Toast';
import { useToastProvider } from './useToastProvider';

export interface ToastItem extends ToastProps {
  id: number;
}

type CreateToastFunction = (content: string) => ToastItem;

interface ToastCreatorByVariant {
  success: CreateToastFunction;
  info: CreateToastFunction;
  warning: CreateToastFunction;
}

const createInitialToastCreatorByVariant =
  (variant: ToastVariant): CreateToastFunction =>
  content => ({
    id: -1,
    variant,
    content,
  });

interface ToastContext {
  inScope: boolean;
  toast: ToastCreatorByVariant;
}

const INITIAL_TOAST_CREATOR: ToastCreatorByVariant = {
  info: createInitialToastCreatorByVariant(TOAST_VARIANT.INFO),
  success: createInitialToastCreatorByVariant(TOAST_VARIANT.SUCCESS),
  warning: createInitialToastCreatorByVariant(TOAST_VARIANT.WARNING),
};

const ToastContext = createContext<ToastContext>({
  inScope: false,
  toast: INITIAL_TOAST_CREATOR,
});

const TOAST_NAME = 'Toast';
ToastContext.displayName = TOAST_NAME;

export const useToast = () => useContextInScope(ToastContext); // 사용편의를 위해 useToast로 설정

function ToastProvider({ children }: PropsWithChildren) {
  const { toast, toastList } = useToastProvider();

  const memoizedValue = useMemo(
    () => ({
      inScope: true,
      toast,
    }),
    [toast],
  );

  return (
    <ToastContext.Provider value={memoizedValue}>
      {children}
      <Portal>
        <Container>
          {toastList.map(toast => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              content={toast.content}
              deleted={toast.deleted}
            />
          ))}
        </Container>
      </Portal>
    </ToastContext.Provider>
  );
}

const Portal = ({ children }: PropsWithChildren) =>
  createPortal(children, document.getElementById('toast-container') ?? document.body);

export default ToastProvider;

const Container = styled.div`
  position: fixed;
  z-index: 2000;
  bottom: 3.2rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: calc(430px * 0.9);

  transition: all 0.5s ease;
`;
