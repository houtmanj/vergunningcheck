/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'vergunningschecker/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const AUTHENTICATE_USER = 'vergunningschecker/App/AUTHENTICATE_USER';
export const AUTHORIZE_USER = 'vergunningschecker/App/AUTHORIZE_USER';

export const SHOW_GLOBAL_ERROR = 'vergunningschecker/App/SHOW_GLOBAL_ERROR';
export const RESET_GLOBAL_ERROR = 'vergunningschecker/App/RESET_GLOBAL_ERROR';

export const LOGIN = 'vergunningschecker/App/LOGIN';
export const LOGOUT = 'vergunningschecker/App/LOGOUT';
