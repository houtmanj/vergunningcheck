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

import { SHOW_GLOBAL_ERROR, RESET_GLOBAL_ERROR } from './constants';

// The initial state of the App
export const initialState = {
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHOW_GLOBAL_ERROR:
        draft.error = !!action.payload;
        draft.errorMessage = action.payload;
        draft.loading = false;
        break;

      case RESET_GLOBAL_ERROR:
        draft.error = false;
        draft.errorMessage = '';
        draft.loading = false;
        draft.errorEventId = undefined;
        break;

      default:
        draft = state;
        break;
    }
  });
