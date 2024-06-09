import {
  ComponentPropsWithoutRef,
  MouseEvent,
  PropsWithChildren,
  cloneElement,
  useCallback,
  useEffect,
} from 'react';

import { SerializedStyles, css } from '@emotion/react';
import styled from '@emotion/styled';

import { executeSequentially, getValidChild } from '@/utils/@common';

import DialogProvider, { useDialogContext } from './DialogContext';

export type DialogLocation = 'center' | 'bottom';

export interface DialogProps {
  defaultOpen?: boolean;
  location?: DialogLocation;
  onBackdropClick?: VoidFunction;
}

interface TriggerProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

interface ContentProps extends ComponentPropsWithoutRef<'dialog'> {}

interface CloseProps extends ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

function Dialog(dialogProps: PropsWithChildren<DialogProps>) {
  const { children, ...restProps } = dialogProps;

  return <DialogProvider {...restProps}>{children}</DialogProvider>;
}

function Trigger(triggerProps: TriggerProps) {
  const { asChild = false, children, onClick: onClickProps, ...restProps } = triggerProps;
  const { openDialog } = useDialogContext();
  const child = asChild && getValidChild<TriggerProps>(children);

  if (child) {
    return cloneElement(child, {
      ...restProps,
      onClick: executeSequentially(onClickProps, openDialog),
    });
  }

  return (
    <button type='button' onClick={executeSequentially(onClickProps, openDialog)} {...restProps}>
      {children || 'Trigger'}
    </button>
  );
}

function Content(contentProps: ContentProps) {
  const { children, ...restProps } = contentProps;
  const { defaultOpen, dialogRef, location, openDialog, closeDialog, onBackdropClick } =
    useDialogContext();

  const handleBackdropClick = useCallback(
    (e: MouseEvent<HTMLDialogElement>) => {
      if (e.currentTarget === e.target) executeSequentially(onBackdropClick, closeDialog)(null);
    },
    [onBackdropClick],
  );

  useEffect(() => {
    if (defaultOpen) openDialog();
  }, [defaultOpen, openDialog]);

  return (
    <Wrapper ref={dialogRef} onClick={handleBackdropClick} location={location} {...restProps}>
      <BoxForMobile>{children}</BoxForMobile>
    </Wrapper>
  );
}

function Close(closeProps: CloseProps) {
  const { asChild = false, children, onClick: onClickProps, ...restProps } = closeProps;
  const { closeDialog } = useDialogContext();
  const child = asChild && getValidChild<CloseProps>(children);

  if (child) {
    return cloneElement(child, {
      ...restProps,
      onClick: executeSequentially(onClickProps, closeDialog),
    });
  }

  return (
    <button type='button' onClick={executeSequentially(onClickProps, closeDialog)} {...restProps}>
      {children || 'Close'}
    </button>
  );
}

Dialog.Trigger = Trigger;
Dialog.Content = Content;
Dialog.Close = Close;

export default Dialog;

type DialogLocationStyles = Record<DialogLocation, SerializedStyles>;

const dialogLocationStyles: DialogLocationStyles = {
  center: css`
    max-width: 90vw;
    max-height: 50vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &[open] {
      animation: fade-in 0.7s;
    }

    @media screen and (min-width: 768px) {
      max-width: 430px;
      left: 55%;
      transform: translate(0, -50%);
    }
  `,
  bottom: css`
    width: 100vw;
    max-height: 80vh;
    border-end-start-radius: 0;
    border-end-end-radius: 0;

    &[open] {
      animation: fade-in, slide-up 0.7s forwards;
    }

    @media screen and (min-width: 768px) {
      width: 430px;
      left: 55%;
    }
  `,
};

const Wrapper = styled.dialog<{ location: DialogLocation }>`
  max-width: 100vw;

  background-color: transparent;
  border-radius: 20px;
  border: none;

  overflow-y: auto;

  &::backdrop {
    animation: fade-in 0.3s;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(100vh);
    }
    to {
      transform: translateY(calc(100vh - 100%));
    }
  }

  ${({ location }) => dialogLocationStyles[location ?? 'center']}
`;

const BoxForMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: transparent;
  pointer-events: none; // 배경 뒤 클릭 가능하도록 설정

  & * {
    pointer-events: auto;
  }

  @media screen and (min-width: 768px) {
    width: 430px;
    left: 55%;
  }
`;
