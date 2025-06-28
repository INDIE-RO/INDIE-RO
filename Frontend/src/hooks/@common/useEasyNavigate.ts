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

  const normalizeBasePath = (path: string) => {
    const BASE_PATH = '/INDIE-RO';
    return path.startsWith(BASE_PATH) ? path.replace(BASE_PATH, '') : path;
  };

  const updateQueryParams = (
    queryString: string,
    options: { path: string } = { path: location.pathname },
  ) => {
    const normalizedPath = normalizeBasePath(options.path);
    navigate(`${normalizedPath}${updateQueryString(queryString)}`);
  };

  const replaceQueryParams = (
    queryString: string,
    { path = location.pathname, exclude = [] }: { path?: string; exclude?: string[] },
  ) => {
    const normalizedPath = normalizeBasePath(path);
    navigate(`${normalizedPath}${replaceQueryString(queryString, exclude)}`);
  };

  return { navigate, goHome, goBack, goBackSafely, updateQueryParams, replaceQueryParams };
};

export default useEasyNavigate;
