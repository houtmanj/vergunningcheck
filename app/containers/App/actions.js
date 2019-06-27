import { RESET_GLOBAL_ERROR, FETCH_SUGGESTIONS_REQUEST, FETCH_MONUMENT_REQUEST } from './constants';

export const resetGlobalError = () => ({
  type: RESET_GLOBAL_ERROR,
});

export const getSuggestionsAction = (query = '') => ({ type: FETCH_SUGGESTIONS_REQUEST, query });

export const fetchMonumentData = (query = '') => ({ type: FETCH_MONUMENT_REQUEST, query });
