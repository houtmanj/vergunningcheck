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
  // FETCH_BESTEMMINGSPLAN_REQUEST,
  // FETCH_BESTEMMINGSPLAN_SUCCESS,
  // FETCH_BESTEMMINGSPLAN_FAILURE,
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
  isUnesco: '',
  monumentLoading: false,
  monumentStatus: '',
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
        return {
          ...state,
          streetNameError: false,
          streetNameLoading: true,
          streetName: '',
          monumentStatus: '',
          bagFetch: false,
          bagStatus: initialState.bagStatus,
        };
      case FETCH_STREETNAME_SUCCESS:
        return {
          ...state,
          streetNameError: false,
          streetNameLoading: false,
          streetName: action.streetName,
        };
      case FETCH_STREETNAME_FAILURE:
        return {
          ...state,
          streetNameError: true,
          streetNameLoading: false,
        };

      case FETCH_BAG_REQUEST:
        return {
          ...state,
          error: false,
          bagFetch: true,
          bagLoading: true,
          bagStatus: initialState.bagStatus,
          monumentStatus: '',
          noResults: false,
        };
      case FETCH_BAG_SUCCESS:
        return {
          ...state,
          bagLoading: false,
          bagStatus: action.bag,
        };
      case FETCH_BAG_NO_RESULTS:
        return {
          ...state,
          error: false,
          bagLoading: false,
          bagStatus: initialState.bag,
          noResults: true,
        };
      case FETCH_BAG_FAILURE:
        return {
          ...state,
          error: true,
          errorMessage: 'Helaas is geen verbinding met de server. Probeer het later opnieuw',
          bagLoading: false,
          bagStatus: initialState.bagStatus,
          noResults: false,
        };

      case FETCH_MONUMENT_REQUEST:
        return {
          ...state,
          error: false,
          monumentLoading: true,
          monumentStatus: '',
        };
      case FETCH_MONUMENT_SUCCESS:
        return {
          ...state,
          monumentLoading: false,
          monumentStatus: action.monument,
        };
      case FETCH_MONUMENT_FAILURE:
        return {
          ...state,
          error: true,
          monumentLoading: false,
          monumentStatus: '',
        };

      case FETCH_BEPERKING_REQUEST:
        return {
          ...state,
          error: false,
          beperkingLoading: true,
          beperkingStatus: [],
        };
      case FETCH_BEPERKING_SUCCESS:
        return {
          ...state,
          beperkingLoading: false,
          beperkingStatus: action.beperking,
        };
      case FETCH_BEPERKING_FAILURE:
        return {
          ...state,
          error: true,
          beperkingLoading: false,
          beperkingStatus: [],
        };

      // case FETCH_BESTEMMINGSPLAN_REQUEST:
      //   return {
      //     ...state,
      //     error: false,
      //     planFetch: true,
      //     planLoading: true,
      //     planStatus: '',
      //   };
      // case FETCH_BESTEMMINGSPLAN_SUCCESS:
      //   return {
      //     ...state,
      //     planLoading: false,
      //     planStatus: action.plan,
      //   };
      // case FETCH_BESTEMMINGSPLAN_FAILURE:
      //   return {
      //     ...state,
      //     error: true,
      //     planLoading: false,
      //     planStatus: '',
      //   };

      default:
        draft = state;
        break;
    }
  });
