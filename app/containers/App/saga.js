import { all, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

// import { authCall } from 'shared/services/api/api';
// import CONFIGURATION from 'shared/services/configuration/configuration';
// export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

import autoSuggestSearch from 'shared/services/auto-suggest/auto-suggest';
import { FETCH_SUGGESTIONS_REQUEST, FETCH_SUGGESTIONS_SUCCESS, FETCH_SUGGESTIONS_FAILURE } from './constants';

export function* fetchSuggestions(action) {
  try {
    const suggestions = yield call(autoSuggestSearch, action.query);
    yield put({ type: FETCH_SUGGESTIONS_SUCCESS, suggestions });
  } catch (error) {
    yield put({ type: FETCH_SUGGESTIONS_FAILURE, error });
  }
}

export default function* watchFetchSuggestions() {
  yield takeLatest(FETCH_SUGGESTIONS_REQUEST, fetchSuggestions);
}
