import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  searchForAddress,
  searchBag,
  searchForMonument,
  searchForStadsgezicht,
  searchForBeperking,
  searchForBestemmingsplan,
} from 'shared/services/api';

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
  FETCH_STADSGEZICHT_REQUEST,
  FETCH_STADSGEZICHT_SUCCESS,
  FETCH_STADSGEZICHT_FAILURE,
  FETCH_BEPERKING_REQUEST,
  FETCH_BEPERKING_SUCCESS,
  FETCH_BEPERKING_FAILURE,
  FETCH_BESTEMMINGSPLAN_REQUEST,
  FETCH_BESTEMMINGSPLAN_SUCCESS,
  FETCH_BESTEMMINGSPLAN_FAILURE,
} from './constants';

export function* fetchStreetname(action) {
  try {
    const addressResults = yield call(searchForAddress, action.query);
    yield delay(600);
    yield put({ type: FETCH_STREETNAME_SUCCESS, addressResults });
  } catch (error) {
    yield put({ type: FETCH_STREETNAME_FAILURE, error });
  }
}

export function* fetchBag(action) {
  try {
    const bag = yield call(searchBag, action.query.postcode);
    if (bag) {
      yield put({ type: FETCH_BAG_SUCCESS, bag });
      yield put({ type: FETCH_BESTEMMINGSPLAN_REQUEST, bag });
      yield put({ type: FETCH_MONUMENT_REQUEST, bag });
      yield put({ type: FETCH_BEPERKING_REQUEST, bag });
      yield put({ type: FETCH_STADSGEZICHT_REQUEST, bag });
    } else {
      yield put({ type: FETCH_BAG_NO_RESULTS });
    }
  } catch (error) {
    yield put({ type: FETCH_BAG_FAILURE, error });
  }
}

export function* fetchMomument(action) {
  const { verblijfsobjectidentificatie: pandId = '' } = action.bag;
  try {
    const monument = yield call(searchForMonument, pandId);
    yield put({ type: FETCH_MONUMENT_SUCCESS, monument });
  } catch (error) {
    yield put({ type: FETCH_MONUMENT_FAILURE, error });
  }
}

export function* fetchBeperking(action) {
  const { verblijfsobjectidentificatie: pandId = '' } = action.bag;
  try {
    const beperking = yield call(searchForBeperking, pandId);
    yield put({ type: FETCH_BEPERKING_SUCCESS, beperking });
  } catch (error) {
    yield put({ type: FETCH_BEPERKING_FAILURE, error });
  }
}

export function* fetchStadsgezicht(action) {
  const { geometrie = '' } = action.bag;
  try {
    const stadsgezicht = yield call(searchForStadsgezicht, geometrie);
    yield put({ type: FETCH_STADSGEZICHT_SUCCESS, stadsgezicht });
  } catch (error) {
    yield put({ type: FETCH_STADSGEZICHT_FAILURE, error });
  }
}

export function* fetchBestemmingplan(action) {
  const { geometrie = '' } = action.bag;
  try {
    if (geometrie !== '') {
      const bestemmingsplan = yield call(searchForBestemmingsplan, geometrie);
      yield put({ type: FETCH_BESTEMMINGSPLAN_SUCCESS, bestemmingsplan });
    }
  } catch (error) {
    yield put({ type: FETCH_BESTEMMINGSPLAN_FAILURE, error });
  }
}

export default function* watchFetchSuggestions() {
  yield takeLatest(FETCH_BAG_REQUEST, fetchBag);
  yield takeLatest(FETCH_STREETNAME_REQUEST, fetchStreetname);
  yield takeLatest(FETCH_MONUMENT_REQUEST, fetchMomument);
  yield takeLatest(FETCH_BEPERKING_REQUEST, fetchBeperking);
  yield takeLatest(FETCH_STADSGEZICHT_REQUEST, fetchStadsgezicht);
  yield takeLatest(FETCH_BESTEMMINGSPLAN_REQUEST, fetchBestemmingplan);
}
