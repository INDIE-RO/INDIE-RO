import { useNavigate } from 'react-router-dom';

import { FORM_EXIT_CONFIRMATION_MESSAGE } from '@/constants/common';
import { PATH } from '@/constants/path';

const useEasyNavigate = () => {
  const navigate = useNavigate();

  const goHome = () => navigate(PATH.HOME);

  const goBack = () => navigate(-1);

  const goBackSafely = () => {
    confirm(FORM_EXIT_CONFIRMATION_MESSAGE) && goBack();
  };

  return { goHome, goBack, goBackSafely };
};

export default useEasyNavigate;
