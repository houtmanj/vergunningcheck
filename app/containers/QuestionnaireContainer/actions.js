import { FETCH_QUESTIONNAIRE_REQUEST } from './constants';

export const fetchQuestionnaire = (query = '') => ({ type: FETCH_QUESTIONNAIRE_REQUEST, query });
