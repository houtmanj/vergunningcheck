import {
  RESET_GLOBAL_ERROR,
  FETCH_SUGGESTIONS_REQUEST,
  FETCH_STREETNAME_REQUEST,
  FETCH_BAG_REQUEST,
  FETCH_MONUMENT_REQUEST,
  FETCH_BESTEMMINGSPLAN_REQUEST,
} from './constants';

export const resetGlobalError = () => ({
  type: RESET_GLOBAL_ERROR,
});

export const getSuggestionsAction = (query = '') => ({ type: FETCH_SUGGESTIONS_REQUEST, query });

export const fetchStreetname = (query = '') => ({ type: FETCH_STREETNAME_REQUEST, query });

export const fetchBagData = (query = '') => ({ type: FETCH_BAG_REQUEST, query });

export const fetchMonumentData = (query = '') => ({ type: FETCH_MONUMENT_REQUEST, query });

export const fetchBestemmingsplanData = (query = '') => ({ type: FETCH_BESTEMMINGSPLAN_REQUEST, query });
