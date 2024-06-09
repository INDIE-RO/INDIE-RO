import { Dispatch, PropsWithChildren, createContext, useMemo, useState } from 'react';

import { useContextInScope } from '@/hooks/@common';

interface ConfirmItem {
  message: string;
  buttons: {
    ok: {
      text: string;
      click: VoidFunction;
    };
    cancel: {
      text: string;
      click: VoidFunction;
    };
  };
}

const INITIAL_CONFIRM_ITEM: ConfirmItem = {
  message: '',
  buttons: {
    ok: {
      text: '확인',
      click: () => {},
    },
    cancel: {
      text: '취소',
      click: () => {},
    },
  },
};

interface DialogConfirmContext {
  inScope: boolean;
  confirmItem: ConfirmItem;
  setConfirmItem: Dispatch<React.SetStateAction<ConfirmItem>>;
}

export const DialogConfirmContext = createContext<DialogConfirmContext>({
  inScope: false,
  confirmItem: INITIAL_CONFIRM_ITEM,
  setConfirmItem: () => {},
});

const DIALOG_CONFIRM_NAME = 'Confirm';
DialogConfirmContext.displayName = DIALOG_CONFIRM_NAME;

export const useConfirmContext = () => useContextInScope(DialogConfirmContext);

const DialogConfirmContextProvider = ({ children }: PropsWithChildren) => {
  const [confirmItem, setConfirmItem] = useState<ConfirmItem>(INITIAL_CONFIRM_ITEM);

  const memoizedValue = useMemo(
    () => ({
      inScope: true,
      confirmItem,
      setConfirmItem,
    }),
    [confirmItem],
  );

  return (
    <DialogConfirmContext.Provider value={memoizedValue}>{children}</DialogConfirmContext.Provider>
  );
};

export default DialogConfirmContextProvider;
