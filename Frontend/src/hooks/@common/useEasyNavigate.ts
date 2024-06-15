import { useNavigate } from 'react-router-dom';

import { FORM_EXIT_CONFIRMATION_MESSAGE } from '@/constants/common';
import { PATH } from '@/constants/path';
import { replaceQueryString, updateQueryString } from '@/utils/route';

const useEasyNavigate = () => {
  const navigate = useNavigate();

  const goHome = () => navigate(PATH.HOME);

  const goBack = () => navigate(-1);

  const goBackSafely = () => {
    confirm(FORM_EXIT_CONFIRMATION_MESSAGE) && goBack();
  };

  const updateQueryParams = (
    queryString: string,
    options: { path: string } = { path: location.pathname },
  ) => {
    navigate(`${options.path}${updateQueryString(queryString)}`);
  };

  const replaceQueryParams = (
    queryString: string,
    { path = location.pathname, exclude = [] }: { path?: string; exclude?: string[] },
  ) => {
    navigate(`${path}${replaceQueryString(queryString, exclude)}`);
  };

  return { navigate, goHome, goBack, goBackSafely, updateQueryParams, replaceQueryParams };
};

export default useEasyNavigate;
