import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

// import { authCall } from 'shared/services/api/api';
// import CONFIGURATION from 'shared/services/configuration/configuration';
// export const baseUrl = `${CONFIGURATION.API_ROOT}signals/auth/me`;

import {
  searchForAddress,
  searchBag,
  searchForMonument,
  searchForBestemmingsplan,
} from 'shared/services/auto-suggest/auto-suggest';

import { fetchMonumentData } from './actions';

import {
  FETCH_SUGGESTIONS_REQUEST,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
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

export function* fetchSuggestions(action) {
  try {
    const suggestions = yield call(searchForAddress, action.query);
    yield put({ type: FETCH_SUGGESTIONS_SUCCESS, suggestions });
  } catch (error) {
    yield put({ type: FETCH_SUGGESTIONS_FAILURE, error });
  }
}

export function* fetchBag(action) {
  try {
    const bag = yield call(searchBag, action.query);
    yield put({ type: FETCH_BAG_SUCCESS, bag });
    yield put({ type: FETCH_MONUMENT_REQUEST, bag });
    yield put({ type: FETCH_BESTEMMINGSPLAN_REQUEST, bag });
  } catch (error) {
    yield put({ type: FETCH_BAG_FAILURE, error });
  }
}

export function* fetchMomument(action) {
  const { pandId = '' } = action.bag;
  try {
    const monument = yield call(searchForMonument, pandId);
    yield put({ type: FETCH_MONUMENT_SUCCESS, monument });
  } catch (error) {
    yield put({ type: FETCH_MONUMENT_FAILURE, error });
  }
}

export function* fetchBestemmingsplan(action) {
  try {
    const plan = yield call(searchForBestemmingsplan, action.bag);
    yield put({ type: FETCH_BESTEMMINGSPLAN_SUCCESS, plan });
  } catch (error) {
    yield put({ type: FETCH_BESTEMMINGSPLAN_FAILURE, error });
  }
}

export default function* watchFetchSuggestions() {
  yield takeLatest(FETCH_SUGGESTIONS_REQUEST, fetchSuggestions);
  yield takeLatest(FETCH_BAG_REQUEST, fetchBag);
  yield takeLatest(FETCH_MONUMENT_REQUEST, fetchMomument);
  yield takeLatest(FETCH_BESTEMMINGSPLAN_REQUEST, fetchBestemmingsplan);
}
