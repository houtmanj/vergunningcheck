/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import produce from 'immer';

import {
  FETCH_STREETNAME_REQUEST,
  FETCH_STREETNAME_SUCCESS,
  FETCH_STREETNAME_FAILURE,
  FETCH_BAG_REQUEST,
  FETCH_BAG_SUCCESS,
  FETCH_BAG_NO_RESULTS,
  FETCH_BAG_FAILURE,
  FETCH_MONUMENT_REQUEST,
  FETCH_MONUMENT_SUCCESS,
  FETCH_MONUMENT_FAILURE,
  FETCH_BEPERKING_REQUEST,
  FETCH_BEPERKING_SUCCESS,
  FETCH_BEPERKING_FAILURE,
  FETCH_STADSGEZICHT_REQUEST,
  FETCH_STADSGEZICHT_SUCCESS,
  FETCH_STADSGEZICHT_FAILURE,
} from './constants';

// The initial state of the App
export const initialState = {
  error: false,
  streetName: '',
  streetNameLoading: false,
  streetNameError: false,
  bagFetch: false,
  bagLoading: false,
  bagStatus: {
    _display: '',
    _gemeente: {
      _display: '',
    },
    _buurtcombinatie: {
      naam: '',
    },
    _gebiedsgerichtwerken: {
      naam: '',
    },
    verblijfsobjectidentificatie: '',
  },
  monumentLoading: false,
  monumentStatus: '',
  stadsgezichtLoading: false,
  stadsgezichtStatus: '',
  planFetch: false,
  planLoading: false,
  planStatus: '',
  beperkingLoading: false,
  beperkingStatus: [],
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    // console.log('ACTION', action);

    switch (action.type) {
      case FETCH_STREETNAME_REQUEST:
        draft.streetNameError = false;
        draft.streetNameLoading = true;
        draft.streetName = '';
        draft.monumentStatus = '';
        draft.bagFetch = false;
        draft.bagStatus = initialState.bagStatus;
        break;

      case FETCH_STREETNAME_SUCCESS:
        draft.streetNameError = false;
        draft.streetNameLoading = false;
        draft.streetName = action.streetName;
        break;

      case FETCH_STREETNAME_FAILURE:
        draft.streetNameError = false;
        draft.streetNameLoading = false;
        draft.streetName = action.streetName;
        break;

      case FETCH_BAG_REQUEST:
        draft.error = false;
        draft.bagFetch = true;
        draft.bagLoading = true;
        draft.bagStatus = initialState.bagStatus;
        draft.monumentStatus = '';
        draft.noResults = false;
        break;

      case FETCH_BAG_SUCCESS:
        draft.bagLoading = false;
        draft.bagStatus = action.bag;
        break;

      case FETCH_BAG_NO_RESULTS:
        draft.error = false;
        draft.bagLoading = false;
        draft.bagStatus = initialState.bag;
        draft.noResults = true;
        break;

      case FETCH_BAG_FAILURE:
        draft.error = true;
        draft.errorMessage = 'Helaas is geen verbinding met de server. Probeer het later opnieuw';
        draft.bagLoading = false;
        draft.bagStatus = initialState.bagStatus;
        draft.noResults = false;
        break;

      case FETCH_MONUMENT_REQUEST:
        draft.error = false;
        draft.monumentLoading = true;
        draft.monumentStatus = '';
        break;

      case FETCH_MONUMENT_SUCCESS:
        draft.monumentLoading = false;
        draft.monumentStatus = action.monument;
        break;

      case FETCH_MONUMENT_FAILURE:
        draft.error = true;
        draft.monumentLoading = false;
        draft.monumentStatus = '';
        break;

      case FETCH_BEPERKING_REQUEST:
        draft.error = false;
        draft.beperkingLoading = true;
        draft.beperkingStatus = [];
        break;

      case FETCH_BEPERKING_SUCCESS:
        draft.beperkingLoading = false;
        draft.beperkingStatus = action.beperking;
        break;

      case FETCH_BEPERKING_FAILURE:
        draft.error = true;
        draft.beperkingLoading = false;
        draft.beperkingStatus = [];
        break;

      case FETCH_STADSGEZICHT_REQUEST:
        draft.error = false;
        draft.stadsgezichtLoading = true;
        draft.stadsgezichtStatus = '';
        break;

      case FETCH_STADSGEZICHT_SUCCESS:
        draft.stadsgezichtLoading = false;
        draft.stadsgezichtStatus = action.stadsgezicht;
        break;

      case FETCH_STADSGEZICHT_FAILURE:
        draft.error = true;
        draft.stadsgezichtLoading = false;
        draft.stadsgezichtStatus = '';
        break;

      default:
        break;
    }
  });
