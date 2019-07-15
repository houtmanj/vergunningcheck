import {
  FETCH_STREETNAME_REQUEST,
  FETCH_BAG_REQUEST,
  FETCH_MONUMENT_REQUEST,
  FETCH_BESTEMMINGSPLAN_REQUEST,
} from './constants';

export const fetchStreetname = (query = '') => ({ type: FETCH_STREETNAME_REQUEST, query });

export const fetchBagData = (postcode, streetNumber) => ({
  type: FETCH_BAG_REQUEST,
  query: { postcode, streetNumber },
});

export const fetchMonumentData = (query = '') => ({ type: FETCH_MONUMENT_REQUEST, query });

export const fetchBestemmingsplanData = (query = '') => ({ type: FETCH_BESTEMMINGSPLAN_REQUEST, query });
