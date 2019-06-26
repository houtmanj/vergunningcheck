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

import { FETCH_SUGGESTIONS_REQUEST } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  displayQuery: '',
  typedQuery: '',
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_SUGGESTIONS_REQUEST:
        return {
          displayQuery: action.query,
          error: false,
          loading: true,
          typedQuery: action.query,
        };

      default:
        draft = state;
        break;
    }
  });

export default appReducer;
