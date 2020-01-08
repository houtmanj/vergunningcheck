import { call, put, takeLatest } from 'redux-saga/effects';

import { receiveQuestionnaire } from 'shared/services/questionnaire/questionnaire';

import { FETCH_QUESTIONNAIRE_REQUEST, FETCH_QUESTIONNAIRE_SUCCES, FETCH_QUESTIONNAIRE_FAILURE } from './constants';

export function* fetchQuestionnaire(action) {
  try {
    const questionnaire = yield call(receiveQuestionnaire, action.query);
    yield put({ type: FETCH_QUESTIONNAIRE_SUCCES, questionnaire });
  } catch (error) {
    yield put({ type: FETCH_QUESTIONNAIRE_FAILURE, error });
  }
}

export default function* watchFetchQuestionnaire() {
  yield takeLatest(FETCH_QUESTIONNAIRE_REQUEST, fetchQuestionnaire);
}
