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
  RESET_GLOBAL_ERROR,
  FETCH_SUGGESTIONS_REQUEST,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_STREETNAME_REQUEST,
  FETCH_STREETNAME_SUCCESS,
  FETCH_STREETNAME_FAILURE,
  FETCH_BAG_REQUEST,
  FETCH_BAG_SUCCESS,
  FETCH_BAG_FAILURE,
  FETCH_MONUMENT_REQUEST,
  FETCH_MONUMENT_SUCCESS,
  FETCH_MONUMENT_FAILURE,
  FETCH_BESTEMMINGSPLAN_REQUEST,
  FETCH_BESTEMMINGSPLAN_SUCCESS,
  FETCH_BESTEMMINGSPLAN_FAILURE,
} from './constants';

// The initial state of the App
export const initialState = {
  suggestionLoading: false,
  error: false,
  streetName: '',
  suggestions: [],
  geometrie: {},
  bagFetch: false,
  bagLoading: false,
  bagStatus: {},
  monumentFetch: false,
  monumentLoading: false,
  monumentStatus: '',
  planFetch: false,
  planLoading: false,
  planStatus: '',
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    // console.log('ACTION', action);
    switch (action.type) {
      case RESET_GLOBAL_ERROR:
        draft.error = false;
        draft.errorMessage = '';
        draft.loading = false;
        draft.errorEventId = undefined;
        break;

      case FETCH_SUGGESTIONS_REQUEST:
        return {
          ...state,
          error: false,
          suggestionLoading: true,
          monumentFetch: false,
          bagFetch: false,
          monumentLoading: false,
          monumentStatus: '',
          suggestions: [],
        };
      case FETCH_SUGGESTIONS_SUCCESS:
        return {
          ...state,
          error: false,
          suggestionLoading: false,
          suggestions: action.suggestions,
        };
      case FETCH_SUGGESTIONS_FAILURE:
        return {
          ...state,
          error: true,
          suggestionLoading: false,
          suggestions: [],
        };

      case FETCH_STREETNAME_REQUEST:
        return {
          ...state,
          streetnameError: false,
          streetnameLoading: true,
          streetName: '',
          suggestions: [],
          monumentStatus: '',
          monumentFetch: false,
          bagFetch: false,
        };
      case FETCH_STREETNAME_SUCCESS:
        return {
          ...state,
          streetnameError: false,
          streetnameLoading: false,
          streetName: action.streetname,
        };
      case FETCH_STREETNAME_FAILURE:
        return {
          ...state,
          streetnameError: true,
          streetnameLoading: false,
          suggestions: [],
        };

      case FETCH_BAG_REQUEST:
        return {
          ...state,
          error: false,
          bagFetch: true,
          bagLoading: true,
          bagStatus: {},
          monumentStatus: '',
          monumentFetch: false,
        };
      case FETCH_BAG_SUCCESS:
        return {
          ...state,
          bagLoading: false,
          bagStatus: action.bag,
        };
      case FETCH_BAG_FAILURE:
        return {
          ...state,
          error: true,
          bagLoading: false,
          bagStatus: {},
        };

      case FETCH_MONUMENT_REQUEST:
        return {
          ...state,
          error: false,
          monumentFetch: true,
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

      case FETCH_BESTEMMINGSPLAN_REQUEST:
        return {
          ...state,
          error: false,
          planFetch: true,
          planLoading: true,
          planStatus: '',
        };
      case FETCH_BESTEMMINGSPLAN_SUCCESS:
        return {
          ...state,
          planLoading: false,
          planStatus: action.plan,
        };
      case FETCH_BESTEMMINGSPLAN_FAILURE:
        return {
          ...state,
          error: true,
          planLoading: false,
          planStatus: '',
        };

      default:
        draft = state;
        break;
    }
  });
