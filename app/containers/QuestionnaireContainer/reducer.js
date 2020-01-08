import produce from 'immer';

import { FETCH_QUESTIONNAIRE_REQUEST, FETCH_QUESTIONNAIRE_SUCCES, FETCH_QUESTIONNAIRE_FAILURE } from './constants';

// The initial state of the App
export const initialState = {
  error: false,
  loading: false,
  questionnaire: {},
};

/* eslint-disable default-case, no-param-reassign */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_QUESTIONNAIRE_REQUEST:
        draft.error = false;
        draft.loading = true;
        draft.questionnaire = {};
        break;
      case FETCH_QUESTIONNAIRE_SUCCES:
        draft.loading = false;
        draft.questionnaire = action.questionnaire;
        break;
      case FETCH_QUESTIONNAIRE_FAILURE:
        draft.loading = false;
        draft.error = true;
        break;

      default:
        break;
    }
  });
