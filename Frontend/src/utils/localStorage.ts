import { ERROR_MESSAGE } from '@/constants/error';
import { SurveyValue } from '@/pages/SurveyPage/Survey.type';

export const STORAGE_KEY = {
  survey: 'survey',
  recentViewedPolicyId: 'recentViewedPolicyId',
} as const;

const getLocalStorage = <T>(key: keyof typeof STORAGE_KEY): T | null => {
  const item = localStorage.getItem(key);

  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      throw new Error(ERROR_MESSAGE.LOCAL_STORAGE_GET_ITEM_ERROR);
    }
  }
  return null;
};

const setLocalStorage = (key: keyof typeof STORAGE_KEY, newItem: unknown) => {
  try {
    const stringifiedNewItem = JSON.stringify(newItem);

    localStorage.setItem(key, stringifiedNewItem);
  } catch (error) {
    throw new Error(ERROR_MESSAGE.LOCAL_STORAGE_SET_ITEM_ERROR);
  }
};

const getSurvey = (): SurveyValue | null => getLocalStorage<SurveyValue>(STORAGE_KEY.survey);
const setSurvey = (newValue: SurveyValue) => setLocalStorage(STORAGE_KEY.survey, newValue);
const getRecentViewedPolicyId = (): number | null =>
  getLocalStorage<number>(STORAGE_KEY.recentViewedPolicyId);
const setRecentViewedPolicyId = (policyId: number) =>
  setLocalStorage(STORAGE_KEY.recentViewedPolicyId, policyId);

export const indieroLocalStorage = {
  getSurvey,
  setSurvey,
  getRecentViewedPolicyId,
  setRecentViewedPolicyId,
};
