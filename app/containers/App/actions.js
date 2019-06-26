import { RESET_GLOBAL_ERROR, FETCH_SUGGESTIONS_REQUEST } from './constants';

export const getSuggestionsAction = (query = '') => ({ type: FETCH_SUGGESTIONS_REQUEST, query });

export const resetGlobalError = () => ({
  type: RESET_GLOBAL_ERROR,
});
