import { useConfirmContext } from '@/components/@common/DialogConfirm/DialogConfirmContext';

interface ConfirmProps {
  message: string;
  buttonLabel?: {
    ok: string;
    cancel: string;
  };
}

const useConfirm = () => {
  const { confirmItem, setConfirmItem } = useConfirmContext();

  const confirm = (confirmProps: ConfirmProps) => {
    const { message, buttonLabel = { ok: '확인', cancel: '취소' } } = confirmProps;

    const confirmPromise = new Promise((resolve, reject) => {
      setConfirmItem({
        message,
        buttons: {
          ok: {
            text: buttonLabel.ok,
            click: () => resolve(true),
          },
          cancel: {
            text: buttonLabel.cancel,
            click: () => reject(false),
          },
        },
      });
    });

    return confirmPromise.then(() => true).catch(() => false);
  };

  return { confirm, confirmItem };
};

export default useConfirm;
