import { useEffect, useRef, useState } from 'react';

import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '@/styles/theme';

export const TOAST_VARIANT = { INFO: 'info', SUCCESS: 'success', WARNING: 'warning' } as const;
export type ToastVariant = (typeof TOAST_VARIANT)[keyof typeof TOAST_VARIANT];

export interface ToastProps {
  variant: ToastVariant;
  content: string;
  deleted?: boolean;
}

const TOAST_DISPLAY_DURATION = 4000;

function Toast(toastProps: ToastProps) {
  const { variant, content, deleted } = toastProps;
  const [open, setOpen] = useState(true);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timer.current = setTimeout(() => {
      setOpen(false);
    }, TOAST_DISPLAY_DURATION);

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (deleted) {
      setOpen(false);
      clearTimeout(timer.current);
    }
  }, [deleted, timer.current]);

  return (
    <Wrapper variant={variant} open={open}>
      {content}
    </Wrapper>
  );
}

export default Toast;

type ToastVariantStyles = Record<ToastVariant, SerializedStyles>;

const toastVariantStyles: ToastVariantStyles = {
  info: css`
    background-color: ${theme.colors.white};
    box-shadow: 0 2px 8px 0 rgb(0 0 0 / 15%);
    color: ${theme.textColors.default};
  `,

  success: css`
    background-color: ${theme.colors.primary};
    box-shadow: 0 2px 8px 0 rgba(233, 255, 117, 50%);
    color: ${theme.textColors.default};
  `,

  warning: css`
    background-color: ${theme.colors.red};
    box-shadow: 0 2px 8px 0 rgba(255, 107, 107, 50%);
    color: ${theme.textColors.white};
  `,
};

const Wrapper = styled.div<Pick<ToastProps, 'variant'> & { open: boolean }>`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  width: fit-content;
  max-width: calc(430px * 0.9);
  margin-bottom: 1.2rem;
  padding: 1.2rem 2rem;

  border-radius: 20px;

  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semiBold};

  ${({ variant }) => toastVariantStyles[variant ?? 'info']};

  ${({ open }) =>
    open
      ? css`
          animation: toast-fade-in 0.35s ease-in-out 0s 1 normal forwards;
        `
      : css`
          animation: toast-fade-out 0.5s ease-in-out 0s 1 normal forwards;
        `};

  @keyframes toast-fade-in {
    from {
      opacity: 0;
      transform: translateY(200%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes toast-fade-out {
    from {
      opacity: 1;
      transform: translateY(-0%);
    }
    to {
      opacity: 0;
      transform: translateY(200%);
      display: none;
    }
  }
`;
