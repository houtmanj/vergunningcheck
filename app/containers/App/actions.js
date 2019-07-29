import { SHOW_GLOBAL_ERROR, RESET_GLOBAL_ERROR } from './constants';

export function showGlobalError(message) {
  return {
    type: SHOW_GLOBAL_ERROR,
    payload: message,
  };
}

export const resetGlobalError = () => ({
  type: RESET_GLOBAL_ERROR,
});
