import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  searchForStreetname,
  searchBag,
  searchForMonument,
  searchForUnesco,
  // searchForBestemmingsplan,
} from 'shared/services/auto-suggest/auto-suggest';

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
  // FETCH_BESTEMMINGSPLAN_REQUEST,
  // FETCH_BESTEMMINGSPLAN_SUCCESS,
  // FETCH_BESTEMMINGSPLAN_FAILURE,
} from './constants';

export function* fetchStreetname(action) {
  try {
    const streetName = yield call(searchForStreetname, action.query);
    yield put({ type: FETCH_STREETNAME_SUCCESS, streetName });
  } catch (error) {
    yield put({ type: FETCH_STREETNAME_FAILURE, error });
  }
}

export function* fetchBag(action) {
  try {
    const bag = yield call(searchBag, action.query);
    if (bag) {
      yield put({ type: FETCH_BAG_SUCCESS, bag });
      yield put({ type: FETCH_MONUMENT_REQUEST, bag });
      yield call(searchForUnesco, bag);
      // yield put({ type: FETCH_BESTEMMINGSPLAN_REQUEST, bag });
    } else {
      yield delay(1000);
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

// export function* fetchBestemmingsplan(action) {
//   try {
//     const plan = yield call(searchForBestemmingsplan, action.bag);
//     yield put({ type: FETCH_BESTEMMINGSPLAN_SUCCESS, plan });
//   } catch (error) {
//     yield put({ type: FETCH_BESTEMMINGSPLAN_FAILURE, error });
//   }
// }

export default function* watchFetchSuggestions() {
  yield takeLatest(FETCH_BAG_REQUEST, fetchBag);
  yield takeLatest(FETCH_STREETNAME_REQUEST, fetchStreetname);
  yield takeLatest(FETCH_MONUMENT_REQUEST, fetchMomument);

  // yield takeLatest(FETCH_BESTEMMINGSPLAN_REQUEST, fetchBestemmingsplan);
}
