export const PHOTO_STATE_KEY = 'photo_search';

export const setParamsInStorage = (search: string, page: number) =>
  localStorage.setItem(PHOTO_STATE_KEY, JSON.stringify({ search, page }));

export const getParamsFromStorage = () => {
  const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);

  return savedJSONState
    ? (JSON.parse(savedJSONState) as { search: string; page: number })
    : null;
};
