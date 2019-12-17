/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import locationReducer from 'containers/LocationPage/reducer';
import questionnaireReducer from 'containers/QuestionnaireContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    global: globalReducer,
    language: languageProviderReducer,
    locationData: locationReducer,
    questionnaire: questionnaireReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
