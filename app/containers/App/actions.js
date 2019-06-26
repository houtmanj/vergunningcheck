import { FETCH_SUGGESTIONS_REQUEST } from './constants';

export const getSuggestionsAction = (query = '') => ({ type: FETCH_SUGGESTIONS_REQUEST, query });
