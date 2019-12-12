import { FETCH_STREETNAME_REQUEST, FETCH_BAG_REQUEST } from './constants';

export const fetchStreetname = (query = '') => ({ type: FETCH_STREETNAME_REQUEST, query });

export const fetchBagData = (postcode, streetNumber) => ({
  type: FETCH_BAG_REQUEST,
  query: { postcode, streetNumber },
});
