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
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  errorMsg: {},
  count: 0,
  displayQuery: '',
  typedQuery: '',
  suggestions: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_GLOBAL_ERROR:
        draft.error = false;
        draft.errorMessage = '';
        draft.loading = false;
        draft.errorEventId = undefined;
        break;

      case FETCH_SUGGESTIONS_REQUEST:
        return {
          count: 0,
          displayQuery: action.query,
          error: false,
          loading: true,
          typedQuery: action.query,
        };
      case FETCH_SUGGESTIONS_SUCCESS:
        return {
          count: action.suggestions.count,
          error: false,
          loading: true,
          suggestions: action.suggestions.data,
        };
      case FETCH_SUGGESTIONS_FAILURE:
        return {
          displayQuery: action.query,
          error: true,
          errorMsg: action.error,
          loading: true,
          typedQuery: action.query,
        };

      default:
        draft = state;
        break;
    }
  });

export default appReducer;
