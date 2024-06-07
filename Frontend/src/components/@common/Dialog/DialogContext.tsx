import { PropsWithChildren, RefObject, createContext, useCallback, useMemo, useRef } from 'react';

import { useContextInScope } from '@/hooks/@common';

import { DialogLocation, DialogProps } from './Dialog';

interface DialogContext {
  defaultOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement>;
  inScope: boolean;
  location: DialogLocation;
  openDialog: VoidFunction;
  closeDialog: VoidFunction;
  onBackdropClick?: VoidFunction;
}

interface DialogProviderProps extends DialogProps {}

const DialogContext = createContext<DialogContext>({
  defaultOpen: false,
  dialogRef: { current: null },
  inScope: false,
  location: 'center',
  openDialog: () => {},
  closeDialog: () => {},
  onBackdropClick: () => {},
});

const DIALOG_NAME = 'Dialog';
DialogContext.displayName = DIALOG_NAME;

export const useDialogContext = () => useContextInScope(DialogContext);

function DialogProvider(props: PropsWithChildren<DialogProviderProps>) {
  const { defaultOpen = false, location = 'center', onBackdropClick, children } = props;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = useCallback(() => dialogRef.current?.showModal(), []);
  const closeDialog = useCallback(() => dialogRef.current?.close(), []);

  const memoizedValue = useMemo(
    () => ({
      defaultOpen,
      dialogRef,
      inScope: true,
      location,
      openDialog,
      closeDialog,
      onBackdropClick,
    }),
    [defaultOpen, location, openDialog, closeDialog, onBackdropClick],
  );

  return <DialogContext.Provider value={memoizedValue}>{children}</DialogContext.Provider>;
}

export default DialogProvider;
